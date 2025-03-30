// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import employeesData from "./data/employees.js";
// Create MCP server with name and version
const server = new McpServer({
    name: "hr-mcp-server",
    version: "1.0.0"
});
// Add get_employee_info tool using the high-level API
server.tool("get_employee_info", {
    employee_id: z.string().describe("The ID of the employee to retrieve information for"),
    include_sensitive: z.boolean().optional().default(false).describe("Whether to include sensitive information like SSN (default: false)")
}, async ({ employee_id, include_sensitive }) => {
    console.info(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message: `Looking up employee: ${employee_id}`
        }
    }));
    // Look up employee in our "database"
    const employee = employeesData[employee_id];
    if (!employee) {
        return {
            content: [{ type: "text", text: `No employee found with ID ${employee_id}.` }],
            isError: false
        };
    }
    // Format basic employee information
    let info = `# Employee Information for ${employee.name} (${employee_id})\n\n` +
        `## Personal Details\n` +
        `* **Name:** ${employee.name}\n` +
        `* **Title:** ${employee.title}\n` +
        `* **Department:** ${employee.department}\n` +
        `* **Email:** ${employee.email}\n` +
        `* **Phone:** ${employee.phoneNumber}\n` +
        `* **Date of Birth:** ${employee.dob}\n` +
        `* **Location:** ${employee.location.city}, ${employee.location.state}, ${employee.location.country}\n\n` +
        `## Employment Details\n` +
        `* **Hire Date:** ${employee.hireDate}\n` +
        `* **Years in Company:** ${employee.yearsInCompany}\n` +
        `* **Performance Rating:** ${employee.performanceRating}/5\n`;
    // Add manager information if exists
    if (employee.manager) {
        const manager = employeesData[employee.manager];
        info += `* **Manager:** ${manager ? manager.name : "Unknown"} (${employee.manager})\n`;
    }
    else {
        info += `* **Manager:** None (Executive Level)\n`;
    }
    // Add direct reports if any
    if (employee.directReports.length > 0) {
        info += `* **Direct Reports:** ${employee.directReports.length}\n`;
        info += `  * ${employee.directReports.map(id => {
            const report = employeesData[id];
            return report ? `${report.name} (${id})` : `Unknown (${id})`;
        }).join("\n  * ")}\n`;
    }
    else {
        info += `* **Direct Reports:** None\n`;
    }
    // Add more professional details
    info += `\n## Professional Details\n` +
        `* **Education:** ${employee.educationLevel}\n` +
        `* **Certifications:** ${employee.certifications.join(", ") || "None"}\n` +
        `* **Skills:** ${employee.skills.join(", ")}\n`;
    // Add project information
    info += `* **Current Projects:** ${employee.projectAssignments.join(", ") || "None"}\n\n`;
    // Add leave information
    info += `## Leave Information\n` +
        `* **Vacation Days:** ${employee.vacationDays.used} used / ${employee.vacationDays.total} total (${employee.vacationDays.remaining} remaining)\n` +
        `* **Sick Days:** ${employee.sickDays.used} used / ${employee.sickDays.total} total (${employee.sickDays.remaining} remaining)\n\n`;
    // Add previous positions if any
    if (employee.previousPositions.length > 0) {
        info += `## Previous Positions\n`;
        employee.previousPositions.forEach(position => {
            info += `* **${position.title}** (${position.department}): ${position.startDate} to ${position.endDate}\n`;
        });
        info += `\n`;
    }
    // Add emergency contact
    info += `## Emergency Contact\n` +
        `* **Name:** ${employee.emergencyContact.name}\n` +
        `* **Relationship:** ${employee.emergencyContact.relationship}\n` +
        `* **Phone:** ${employee.emergencyContact.phoneNumber}\n\n`;
    // Add benefits information
    info += `## Benefits\n` +
        `* **Health Insurance:** ${employee.benefits.healthInsurance ? "Enrolled" : "Not Enrolled"}\n` +
        `* **Dental Insurance:** ${employee.benefits.dentalInsurance ? "Enrolled" : "Not Enrolled"}\n` +
        `* **Vision Insurance:** ${employee.benefits.visionInsurance ? "Enrolled" : "Not Enrolled"}\n` +
        `* **401(k):** ${employee.benefits.retirement401k ? "Enrolled" : "Not Enrolled"}\n` +
        `* **Stock Options:** ${employee.benefits.stockOptions ? "Enrolled" : "Not Enrolled"}\n\n`;
    // Add notes
    info += `## Notes\n${employee.notes}\n\n`;
    // Add sensitive information only if requested
    if (include_sensitive) {
        info += `## Confidential Information (RESTRICTED ACCESS)\n` +
            `* **Salary:** $${employee.salary.toLocaleString()}/year\n` +
            `* **SSN:** ${employee.ssn}\n` +
            `* **Last Promotion Date:** ${employee.lastPromotionDate || "No promotions yet"}\n`;
    }
    else {
        info += `## Confidential Information\n` +
            `* Restricted - Use include_sensitive=true parameter to view\n`;
    }
    return {
        content: [{ type: "text", text: info }],
        isError: false
    };
});
// Add search_employees tool
server.tool("search_employees", {
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
}, async ({ query, options = {
    exact_match: false,
    case_sensitive: false,
    limit: 10,
    offset: 0,
    sort_by: "name",
    sort_order: "asc",
    output_format: "brief",
    include_sensitive: false
} }) => {
    console.info(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message: `Searching employees with query: ${JSON.stringify(query)}`
        }
    }));
    // Helper function to check if a field matches the query
    const fieldMatches = (field, searchTerm) => {
        if (!field || !searchTerm)
            return false;
        if (options.exact_match) {
            return options.case_sensitive
                ? field === searchTerm
                : field.toLowerCase() === searchTerm.toLowerCase();
        }
        else {
            return options.case_sensitive
                ? field.includes(searchTerm)
                : field.toLowerCase().includes(searchTerm.toLowerCase());
        }
    };
    // Helper function to check if an array field contains a match
    const arrayFieldContains = (field, searchTerm) => {
        if (!field || !field.length || !searchTerm)
            return false;
        return field.some(item => fieldMatches(item, searchTerm));
    };
    // Filter employees based on query
    let results = Object.entries(employeesData).map(([id, emp]) => ({ ...emp }));
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
        results = results.filter(emp => fieldMatches(emp.location.city, query.location) ||
            fieldMatches(emp.location.state, query.location) ||
            fieldMatches(emp.location.country, query.location));
    }
    if (query.skills) {
        results = results.filter(emp => arrayFieldContains(emp.skills, query.skills));
    }
    if (query.manager) {
        results = results.filter(emp => {
            if (!emp.manager)
                return false;
            // Check if manager ID matches
            if (fieldMatches(emp.manager, query.manager))
                return true;
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
        results = results.filter(emp => query.has_direct_reports
            ? emp.directReports.length > 0
            : emp.directReports.length === 0);
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
        results = results.filter(emp => fieldMatches(emp.name, query.any_field) ||
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
            arrayFieldContains(emp.projectAssignments, query.any_field));
    }
    // Sort results
    let sortField = options.sort_by;
    // Handle special sorting cases
    if (sortField === "years_in_company" || sortField === "years_of_service") {
        sortField = "yearsInCompany";
    }
    else if (sortField === "performance") {
        sortField = "performanceRating";
    }
    else if (sortField === "hire_date" || sortField === "hire" || sortField === "hired") {
        sortField = "hireDate";
    }
    results.sort((a, b) => {
        let aVal = a;
        let bVal = b;
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
        }
        else if (typeof aVal === 'number' && typeof bVal === 'number') {
            return options.sort_order === 'asc' ? aVal - bVal : bVal - aVal;
        }
        else if (aVal instanceof Date && bVal instanceof Date) {
            return options.sort_order === 'asc' ? aVal.getTime() - bVal.getTime() : bVal.getTime() - aVal.getTime();
        }
        else if (aVal instanceof Date) {
            return options.sort_order === 'asc' ? -1 : 1;
        }
        else if (bVal instanceof Date) {
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
    let output;
    if (options.output_format === "brief") {
        // Brief format - basic information only
        const formattedResults = paginatedResults.map(emp => `ID: ${emp.id}\nName: ${emp.name}\nDepartment: ${emp.department}\nTitle: ${emp.title}\nLocation: ${emp.location.city}, ${emp.location.state}\nEmail: ${emp.email}\nPhone: ${emp.phoneNumber}`).join("\n\n");
        output = `# Employee Search Results\n\nFound ${results.length} matching employee(s). Showing ${paginatedResults.length} result(s).\n\n${formattedResults}`;
        // Add pagination info if needed
        if (results.length > options.limit) {
            const totalPages = Math.ceil(results.length / options.limit);
            const currentPage = Math.floor(options.offset / options.limit) + 1;
            output += `\n\n*Page ${currentPage} of ${totalPages}*`;
        }
    }
    else {
        // Detailed format - include more employee information
        output = `# Employee Search Results\n\nFound ${results.length} matching employee(s). Showing ${paginatedResults.length} result(s).\n\n`;
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
            }
            else {
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
        if (results.length > options.limit) {
            const totalPages = Math.ceil(results.length / options.limit);
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
});
// Add request_global_leave tool
server.tool("request_global_leave", {
    employee_id: z.string().describe("The ID of the employee requesting leave"),
    start_date: z.string().describe("Start date of the leave (YYYY-MM-DD)"),
    end_date: z.string().describe("End date of the leave (YYYY-MM-DD)"),
    reason: z.string().describe("Reason for the leave request"),
    countries: z.array(z.string()).describe("Countries for which leave is being requested (e.g., [\"USA\", \"UK\"])"),
    contact_info: z.object({
        email: z.string().optional().describe("Contact email during leave"),
        phone: z.string().optional().describe("Contact phone during leave"),
        emergency_contact: z.string().optional().describe("Emergency contact during leave")
    }).optional().describe("Contact information during leave")
}, async ({ employee_id, start_date, end_date, reason, countries, contact_info }) => {
    console.info(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message: `Processing global leave request for employee: ${employee_id}`
        }
    }));
    // Check if employee exists
    const employee = employeesData[employee_id];
    if (!employee) {
        return {
            content: [{ type: "text", text: `No employee found with ID ${employee_id}.` }],
            isError: true
        };
    }
    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return {
            content: [{ type: "text", text: "Invalid date format. Please use YYYY-MM-DD format." }],
            isError: true
        };
    }
    if (startDate > endDate) {
        return {
            content: [{ type: "text", text: "Start date cannot be after end date." }],
            isError: true
        };
    }
    // Calculate number of days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    // Check for weekend days (simple approach)
    let weekendDays = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 = Sunday, 6 = Saturday
            weekendDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    const workDays = diffDays - weekendDays;
    // Validate if employee has enough vacation days
    if (workDays > employee.vacationDays.remaining) {
        return {
            content: [{
                    type: "text",
                    text: `Insufficient vacation days. Request requires ${workDays} work days, but employee only has ${employee.vacationDays.remaining} remaining.`
                }],
            isError: true
        };
    }
    // Validate countries
    const validCountries = countries.filter(country => ["USA", "US", "United States", "UK", "United Kingdom", "Britain", "Great Britain"].includes(country));
    if (validCountries.length === 0) {
        return {
            content: [{
                    type: "text",
                    text: "Invalid countries specified. This tool supports leave requests for USA and UK only."
                }],
            isError: true
        };
    }
    // Format countries for display
    const formattedCountries = validCountries.map(country => {
        if (["USA", "US", "United States"].includes(country))
            return "United States";
        if (["UK", "United Kingdom", "Britain", "Great Britain"].includes(country))
            return "United Kingdom";
        return country;
    });
    // Generate unique request ID
    const requestId = `GLR-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`;
    // Determine manager approvals needed
    let managerName = "None (Executive Level)";
    if (employee.manager) {
        const manager = employeesData[employee.manager];
        managerName = manager ? manager.name : "Unknown";
    }
    // Generate response
    let response = `# Global Leave Request Submitted\n\n`;
    response += `## Request Details\n`;
    response += `* **Request ID:** ${requestId}\n`;
    response += `* **Status:** Pending Approval\n`;
    response += `* **Employee:** ${employee.name} (${employee_id})\n`;
    response += `* **Department:** ${employee.department}\n`;
    response += `* **Leave Period:** ${start_date} to ${end_date}\n`;
    response += `* **Duration:** ${diffDays} total days (${workDays} work days)\n`;
    response += `* **Countries:** ${formattedCountries.join(", ")}\n`;
    response += `* **Reason:** ${reason}\n\n`;
    response += `## Approval Chain\n`;
    response += `1. **Direct Manager:** ${managerName} - Pending\n`;
    // Add regional approvers based on countries
    let approvalStep = 2;
    if (formattedCountries.includes("United States")) {
        response += `${approvalStep}. **US Regional Compliance:** Amanda Hughes (CFO) - Pending\n`;
        approvalStep++;
    }
    if (formattedCountries.includes("United Kingdom")) {
        response += `${approvalStep}. **UK Regional Compliance:** Benjamin Wright (General Counsel) - Pending\n`;
        approvalStep++;
    }
    response += `${approvalStep}. **Global HR Director:** Alice Smith - Pending\n\n`;
    // Add contact information section
    response += `## Contact Information During Leave\n`;
    if (contact_info) {
        response += `* **Email:** ${contact_info.email || employee.email}\n`;
        response += `* **Phone:** ${contact_info.phone || employee.phoneNumber}\n`;
        if (contact_info.emergency_contact) {
            response += `* **Emergency Contact:** ${contact_info.emergency_contact}\n`;
        }
        else {
            response += `* **Emergency Contact:** ${employee.emergencyContact.name} (${employee.emergencyContact.relationship}): ${employee.emergencyContact.phoneNumber}\n`;
        }
    }
    else {
        response += `* **Email:** ${employee.email}\n`;
        response += `* **Phone:** ${employee.phoneNumber}\n`;
        response += `* **Emergency Contact:** ${employee.emergencyContact.name} (${employee.emergencyContact.relationship}): ${employee.emergencyContact.phoneNumber}\n`;
    }
    response += `\n## Next Steps\n`;
    response += `1. Your request has been submitted and is awaiting approval from your management chain.\n`;
    response += `2. You will receive notifications as your request progresses through the approval process.\n`;
    response += `3. Please allow 2-3 business days for all approvals to be processed.\n`;
    response += `4. For international travel compliance questions, contact Global Mobility at global.mobility@example.com.\n\n`;
    response += `## Compliance Reminders\n`;
    if (formattedCountries.includes("United States")) {
        response += `* **United States:** Ensure you have completed the US tax declaration form if you'll be working during your stay.\n`;
    }
    if (formattedCountries.includes("United Kingdom")) {
        response += `* **United Kingdom:** A temporary work notification is required for stays over 14 days. HR will assist with this process.\n`;
    }
    return {
        content: [{ type: "text", text: response }],
        isError: false
    };
});
// Connect the server using stdio transport for Claude Desktop
const transport = new StdioServerTransport();
server.connect(transport)
    .then(() => {
    console.info(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message: "HR MCP Server running..."
        }
    }));
})
    .catch(err => {
    console.error(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message: `Failed to start MCP server: ${err.message}`
        }
    }));
});
