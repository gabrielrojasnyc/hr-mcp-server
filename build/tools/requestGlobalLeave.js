// src/tools/requestGlobalLeave.ts
import { z } from "zod";
import employeesData from "../data/employees.js";
import { logMessage } from "../utils/logger.js";
// Schema for request_global_leave tool parameters
export const requestGlobalLeaveSchema = {
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
};
// Implementation of request_global_leave tool
export const requestGlobalLeave = async ({ employee_id, start_date, end_date, reason, countries, contact_info }, extra) => {
    logMessage(`Processing global leave request for employee: ${employee_id}`);
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
    // Generate leave request response
    return generateLeaveResponse(employee, employee_id, start_date, end_date, reason, validCountries, contact_info, diffDays, workDays);
};
/**
 * Generates the formatted global leave request response
 */
function generateLeaveResponse(employee, employee_id, start_date, end_date, reason, countries, contact_info, diffDays, workDays) {
    // Format countries for display
    const formattedCountries = countries.map(country => {
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
}
