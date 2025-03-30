// src/tools/searchEmployees.ts
import { z } from "zod";
import employeesData from "../data/employees.js";
import { Employee } from "../data/employees.js";
import { logMessage } from "../utils/logger.js";

// Define the search query schema
export const searchEmployeesSchema = {
  query: z.object({
    name: z.string().optional().describe("Full or partial name to search for"),
    department: z.string().optional().describe("Department name to search for"),
    title: z.string().optional().describe("Job title to search for"),
    email: z.string().optional().describe("Email address to search for"),
    location: z.string().optional().describe("City, state, or country to search for"),
    skills: z.string().optional().describe("Skills to search for"),
    manager: z.string().optional().describe("Manager ID or name to search for"),
    hired_before: z.string().optional().describe("Find employees hired before this date (YYYY-MM-DD)"),
    hired_after: z.string().optional().describe("Find employees hired after this date (YYYY-MM-DD)"),
    years_of_service_min: z.number().optional().describe("Minimum years of service"),
    years_of_service_max: z.number().optional().describe("Maximum years of service"),
    performance_rating: z.number().optional().describe("Performance rating to search for (1-5)"),
    salary_min: z.number().optional().describe("Minimum salary"),
    salary_max: z.number().optional().describe("Maximum salary"),
    has_direct_reports: z.boolean().optional().describe("Whether the employee has direct reports"),
    certifications: z.string().optional().describe("Certifications to search for"),
    education: z.string().optional().describe("Education level to search for"),
    benefits: z.string().optional().describe("Benefits to search for (health, dental, vision, 401k, stock)"),
    any_field: z.string().optional().describe("Search across all text fields")
  }).describe("Search parameters - provide at least one field"),
  options: z.object({
    exact_match: z.boolean().optional().default(false).describe("Whether to require exact matches (default: false for partial matching)"),
    case_sensitive: z.boolean().optional().default(false).describe("Whether search should be case-sensitive (default: false)"),
    limit: z.number().optional().default(10).describe("Maximum number of results to return (default: 10)"),
    offset: z.number().optional().default(0).describe("Number of results to skip (for pagination)"),
    sort_by: z.string().optional().default("name").describe("Field to sort results by (name, department, title, etc.)"),
    sort_order: z.enum(["asc", "desc"]).optional().default("asc").describe("Sort order (ascending or descending)"),
    output_format: z.enum(["brief", "detailed"]).optional().default("brief").describe("Output format (brief or detailed)"),
    include_sensitive: z.boolean().optional().default(false).describe("Whether to include sensitive information like salary, SSN (default: false)")
  }).optional().describe("Search options")
};

// Define the search options interface
interface SearchOptions {
  exact_match: boolean;
  case_sensitive: boolean;
  limit: number;
  offset: number;
  sort_by: string;
  sort_order: "asc" | "desc";
  output_format: "brief" | "detailed";
  include_sensitive: boolean;
}

// Implementation of search_employees tool
export const searchEmployees = async (
  { 
    query, 
    options = { 
      exact_match: false, 
      case_sensitive: false, 
      limit: 10, 
      offset: 0, 
      sort_by: "name", 
      sort_order: "asc",
      output_format: "brief",
      include_sensitive: false
    } 
  }: { 
    query: Record<string, any>, 
    options?: SearchOptions 
  },
  extra: any
) => {
  logMessage(`Searching employees with query: ${JSON.stringify(query)}`);
  
  // Helper function to check if a field matches the query
  const fieldMatches = (field: string | undefined | null, searchTerm: string | undefined): boolean => {
    if (!field || !searchTerm) return false;
    
    if (options.exact_match) {
      return options.case_sensitive 
        ? field === searchTerm
        : field.toLowerCase() === searchTerm.toLowerCase();
    } else {
      return options.case_sensitive 
        ? field.includes(searchTerm)
        : field.toLowerCase().includes(searchTerm.toLowerCase());
    }
  };
  
  // Helper function to check if an array field contains a match
  const arrayFieldContains = (field: string[] | undefined, searchTerm: string | undefined): boolean => {
    if (!field || !field.length || !searchTerm) return false;
    
    return field.some(item => fieldMatches(item, searchTerm));
  };
  
  // Filter employees based on query
  let results = Object.entries(employeesData)
    .map(([id, emp]) => ({ ...emp } as Employee));
  
  // Apply filters based on specific fields
  if (query.name) {
    results = results.filter(emp => fieldMatches(emp.name, query.name));
  }
  
  if (query.department) {
    results = results.filter(emp => fieldMatches(emp.department, query.department));
  }
  
  if (query.title) {
    results = results.filter(emp => fieldMatches(emp.title, query.title));
  }
  
  if (query.email) {
    results = results.filter(emp => fieldMatches(emp.email, query.email));
  }
  
  if (query.location) {
    results = results.filter(emp => 
      fieldMatches(emp.location.city, query.location) || 
      fieldMatches(emp.location.state, query.location) || 
      fieldMatches(emp.location.country, query.location)
    );
  }
  
  if (query.skills) {
    results = results.filter(emp => arrayFieldContains(emp.skills, query.skills));
  }
  
  if (query.manager) {
    results = results.filter(emp => {
      if (!emp.manager) return false;
      
      // Check if manager ID matches
      if (fieldMatches(emp.manager, query.manager)) return true;
      
      // Check if manager name matches
      const manager = employeesData[emp.manager];
      return manager ? fieldMatches(manager.name, query.manager) : false;
    });
  }
  
  if (query.hired_before) {
    const beforeDate = new Date(query.hired_before);
    results = results.filter(emp => new Date(emp.hireDate) <= beforeDate);
  }
  
  if (query.hired_after) {
    const afterDate = new Date(query.hired_after);
    results = results.filter(emp => new Date(emp.hireDate) >= afterDate);
  }
  
  if (query.years_of_service_min !== undefined) {
    results = results.filter(emp => emp.yearsInCompany >= query.years_of_service_min);
  }
  
  if (query.years_of_service_max !== undefined) {
    results = results.filter(emp => emp.yearsInCompany <= query.years_of_service_max);
  }
  
  if (query.performance_rating !== undefined) {
    results = results.filter(emp => emp.performanceRating === query.performance_rating);
  }
  
  if (query.salary_min !== undefined) {
    results = results.filter(emp => emp.salary >= query.salary_min);
  }
  
  if (query.salary_max !== undefined) {
    results = results.filter(emp => emp.salary <= query.salary_max);
  }
  
  if (query.has_direct_reports !== undefined) {
    results = results.filter(emp => 
      query.has_direct_reports 
        ? emp.directReports.length > 0 
        : emp.directReports.length === 0
    );
  }
  
  if (query.certifications) {
    results = results.filter(emp => arrayFieldContains(emp.certifications, query.certifications));
  }
  
  if (query.education) {
    results = results.filter(emp => fieldMatches(emp.educationLevel, query.education));
  }
  
  if (query.benefits) {
    results = results.filter(emp => {
      const benefitTerm = query.benefits?.toLowerCase();
      if (benefitTerm === 'health' || benefitTerm === 'health insurance') 
        return emp.benefits.healthInsurance;
      if (benefitTerm === 'dental' || benefitTerm === 'dental insurance') 
        return emp.benefits.dentalInsurance;
      if (benefitTerm === 'vision' || benefitTerm === 'vision insurance') 
        return emp.benefits.visionInsurance;
      if (benefitTerm === '401k' || benefitTerm === 'retirement') 
        return emp.benefits.retirement401k;
      if (benefitTerm === 'stock' || benefitTerm === 'stock options') 
        return emp.benefits.stockOptions;
      return false;
    });
  }
  
  // Search across all fields if specified
  if (query.any_field) {
    results = results.filter(emp => 
      fieldMatches(emp.name, query.any_field) ||
      fieldMatches(emp.department, query.any_field) ||
      fieldMatches(emp.title, query.any_field) ||
      fieldMatches(emp.email, query.any_field) ||
      fieldMatches(emp.phoneNumber, query.any_field) ||
      fieldMatches(emp.location.city, query.any_field) ||
      fieldMatches(emp.location.state, query.any_field) ||
      fieldMatches(emp.location.country, query.any_field) ||
      fieldMatches(emp.educationLevel, query.any_field) ||
      fieldMatches(emp.notes, query.any_field) ||
      arrayFieldContains(emp.skills, query.any_field) ||
      arrayFieldContains(emp.certifications, query.any_field) ||
      arrayFieldContains(emp.projectAssignments, query.any_field)
    );
  }
  
  // Sort results
  let sortField = options.sort_by;
  // Handle special sorting cases
  if (sortField === "years_in_company" || sortField === "years_of_service") {
    sortField = "yearsInCompany";
  } else if (sortField === "performance") {
    sortField = "performanceRating";
  } else if (sortField === "hire_date" || sortField === "hire" || sortField === "hired") {
    sortField = "hireDate";
  }
  
  results.sort((a: any, b: any) => {
    let aVal: any = a;
    let bVal: any = b;
    
    // Handle complex nested properties like location.city
    const parts = sortField.split('.');
    for (const part of parts) {
      aVal = aVal?.[part];
      bVal = bVal?.[part];
    }
    
    // Handle different types
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = options.case_sensitive
        ? aVal.localeCompare(bVal)
        : aVal.toLowerCase().localeCompare(bVal.toLowerCase());
      return options.sort_order === 'asc' ? comparison : -comparison;
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
      return options.sort_order === 'asc' ? aVal - bVal : bVal - aVal;
    } else if (aVal instanceof Date && bVal instanceof Date) {
      return options.sort_order === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
    } else if (aVal instanceof Date) {
      return options.sort_order === 'asc' ? -1 : 1;
    } else if (bVal instanceof Date) {
      return options.sort_order === 'asc' ? 1 : -1;
    }
    
    // Default sorting for unknown or mixed types
    return options.sort_order === 'asc' ? 1 : -1;
  });
  
  // Apply pagination
  const paginatedResults = results.slice(options.offset, options.offset + options.limit);
  
  // Format results
  if (paginatedResults.length === 0) {
    return {
      content: [{ type: "text", text: "No employees found matching the search criteria." }],
      isError: false
    };
  }
  
  return formatSearchResults(paginatedResults, results.length, options);
};

/**
 * Formats the search results based on the specified output format
 */
function formatSearchResults(
  paginatedResults: Employee[], 
  totalResults: number, 
  options: SearchOptions
) {
  let output: string;
  
  if (options.output_format === "brief") {
    // Brief format - basic information only
    const formattedResults = paginatedResults.map(emp => 
      `ID: ${emp.id}\nName: ${emp.name}\nDepartment: ${emp.department}\nTitle: ${emp.title}\nLocation: ${emp.location.city}, ${emp.location.state}\nEmail: ${emp.email}\nPhone: ${emp.phoneNumber}`
    ).join("\n\n");
    
    output = `# Employee Search Results\n\nFound ${totalResults} matching employee(s). Showing ${paginatedResults.length} result(s).\n\n${formattedResults}`;
    
    // Add pagination info if needed
    if (totalResults > options.limit) {
      const totalPages = Math.ceil(totalResults / options.limit);
      const currentPage = Math.floor(options.offset / options.limit) + 1;
      output += `\n\n*Page ${currentPage} of ${totalPages}*`;
    }
  } else {
    // Detailed format - include more employee information
    output = `# Employee Search Results\n\nFound ${totalResults} matching employee(s). Showing ${paginatedResults.length} result(s).\n\n`;
    
    paginatedResults.forEach((emp, index) => {
      output += `## ${index + 1}. ${emp.name} (${emp.id})\n`;
      output += `**Title:** ${emp.title}  \n`;
      output += `**Department:** ${emp.department}  \n`;
      output += `**Location:** ${emp.location.city}, ${emp.location.state}, ${emp.location.country}  \n`;
      output += `**Contact:** ${emp.email} | ${emp.phoneNumber}  \n`;
      output += `**Hire Date:** ${emp.hireDate} (${emp.yearsInCompany} years)  \n`;
      output += `**Performance:** ${emp.performanceRating}/5  \n`;
      
      // Manager info
      if (emp.manager) {
        const manager = employeesData[emp.manager];
        output += `**Manager:** ${manager ? manager.name : "Unknown"} (${emp.manager})  \n`;
      } else {
        output += `**Manager:** None (Executive Level)  \n`;
      }
      
      // Direct reports
      output += `**Direct Reports:** ${emp.directReports.length}  \n`;
      
      // Skills and certifications
      output += `**Skills:** ${emp.skills.join(", ")}  \n`;
      if (emp.certifications.length > 0) {
        output += `**Certifications:** ${emp.certifications.join(", ")}  \n`;
      }
      
      // Projects
      if (emp.projectAssignments.length > 0) {
        output += `**Current Projects:** ${emp.projectAssignments.join(", ")}  \n`;
      }
      
      // Education
      output += `**Education:** ${emp.educationLevel}  \n`;
      
      // Include sensitive info if requested
      if (options.include_sensitive) {
        output += `**Salary:** $${emp.salary.toLocaleString()}/year  \n`;
        output += `**SSN:** ${emp.ssn}  \n`;
      }
      
      // Add a separator between employees
      if (index < paginatedResults.length - 1) {
        output += "\n---\n\n";
      }
    });
    
    // Add pagination info if needed
    if (totalResults > options.limit) {
      const totalPages = Math.ceil(totalResults / options.limit);
      const currentPage = Math.floor(options.offset / options.limit) + 1;
      output += `\n\n*Page ${currentPage} of ${totalPages}*`;
    }
  }
  
  return {
    content: [{ 
      type: "text", 
      text: output
    }],
    isError: false
  };
}