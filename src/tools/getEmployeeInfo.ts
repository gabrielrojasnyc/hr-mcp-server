// src/tools/getEmployeeInfo.ts
import { z } from "zod";
import employeesData from "../data/employees.js";
import { logMessage } from "../utils/logger.js";

// Schema for get_employee_info tool parameters
export const getEmployeeInfoSchema = {
  employee_id: z.string().describe("The ID of the employee to retrieve information for"),
  include_sensitive: z.boolean().optional().default(false).describe("Whether to include sensitive information like SSN (default: false)")
};

// Implementation of get_employee_info tool
export const getEmployeeInfo = async (
  { employee_id, include_sensitive }: { employee_id: string, include_sensitive: boolean },
  extra: any 
) => {
  logMessage(`Looking up employee: ${employee_id}`);
  
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
  } else {
    info += `* **Manager:** None (Executive Level)\n`;
  }
  
  // Add direct reports if any
  if (employee.directReports.length > 0) {
    info += `* **Direct Reports:** ${employee.directReports.length}\n`;
    info += `  * ${employee.directReports.map(id => {
      const report = employeesData[id];
      return report ? `${report.name} (${id})` : `Unknown (${id})`;
    }).join("\n  * ")}\n`;
  } else {
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
  } else {
    info += `## Confidential Information\n` +
      `* Restricted - Use include_sensitive=true parameter to view\n`;
  }
  
  return {
    content: [{ type: "text", text: info }],
    isError: false
  };
};