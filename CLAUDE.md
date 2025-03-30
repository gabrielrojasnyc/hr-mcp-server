# HR-MCP-SERVER-2 Development Guide

## Commands
- Build: `npm run build` (TypeScript compiler with Node16 module system)
- Run server: `npm start` (runs the built JavaScript)
- Run dev: `npx ts-node-esm src/index.ts` (runs TypeScript directly)
- View logs: `cat mcp.log` (server communication logs)

## Code Style
- Formatting: Use Prettier with default config
- Types: TypeScript strict mode with proper typing
- Naming: camelCase for variables/functions, PascalCase for classes
- Error handling: Return isError: true for error responses

## Project Structure
- `/src`: Source code (main server implementation)
- `/build`: Compiled JavaScript output

## MCP Server Implementation
- Use the high-level `McpServer` class from `@modelcontextprotocol/sdk/server/mcp.js`
- Initialize with `new McpServer({ name: "server-name", version: "1.0.0" })`
- Define tools with the `server.tool()` method:
  ```typescript
  server.tool(
    "tool_name",
    { param_name: z.string().describe("Parameter description") },
    async ({ param_name }) => {
      // Tool implementation
      return {
        content: [{ type: "text", text: "Result text" }],
        isError: false // Set to true for error responses
      };
    }
  )
  ```
- Tool response format must be:
  ```typescript
  {
    content: [{ type: "text", text: string }],
    isError: boolean
  }
  ```
- Connect with stdio transport for Claude Desktop:
  ```typescript
  const transport = new StdioServerTransport();
  server.connect(transport);
  ```
- Log with proper JSON-RPC format:
  ```typescript
  console.info('{"jsonrpc": "2.0", "method": "log", "params": { "message": "Log message" }}');
  ```

## Available Tools

### get_employee_info
Retrieves detailed information about a specific employee by ID
- Parameters:
  - `employee_id`: (string, required) The ID of the employee to retrieve information for
  - `include_sensitive`: (boolean, optional, default: false) Whether to include sensitive information like salary and SSN
- Example: `get_employee_info({ employee_id: "E001" })`
- Example with sensitive info: `get_employee_info({ employee_id: "E001", include_sensitive: true })`

### search_employees
Search for employees by various criteria with flexible matching options
- Parameters:
  - `query`: Object containing search criteria (at least one required)
    - `name`: (optional) Full or partial name to search for
    - `department`: (optional) Department name to search for
    - `title`: (optional) Job title to search for
    - `email`: (optional) Email address to search for
    - `location`: (optional) City, state, or country to search for
    - `skills`: (optional) Skills to search for
    - `manager`: (optional) Manager ID or name to search for
    - `hired_before`: (optional) Find employees hired before this date (YYYY-MM-DD)
    - `hired_after`: (optional) Find employees hired after this date (YYYY-MM-DD)
    - `years_of_service_min`: (optional) Minimum years of service
    - `years_of_service_max`: (optional) Maximum years of service
    - `performance_rating`: (optional) Performance rating to search for (1-5)
    - `salary_min`: (optional) Minimum salary
    - `salary_max`: (optional) Maximum salary
    - `has_direct_reports`: (optional) Whether the employee has direct reports
    - `certifications`: (optional) Certifications to search for
    - `education`: (optional) Education level to search for
    - `benefits`: (optional) Benefits to search for (health, dental, vision, 401k, stock)
    - `any_field`: (optional) Search across all text fields
  - `options`: (optional) Object containing search options
    - `exact_match`: (boolean, default: false) Whether to require exact matches
    - `case_sensitive`: (boolean, default: false) Whether search should be case-sensitive
    - `limit`: (number, default: 10) Maximum results to return
    - `offset`: (number, default: 0) Results to skip for pagination
    - `sort_by`: (string, default: "name") Field to sort results by (name, department, title, etc.)
    - `sort_order`: ("asc" or "desc", default: "asc") Sort order (ascending or descending)
    - `output_format`: ("brief" or "detailed", default: "brief") Output format 
    - `include_sensitive`: (boolean, default: false) Whether to include sensitive information

- Examples:
  - Basic search: `search_employees({ query: { department: "Engineering" } })`
  - Advanced search: `search_employees({ query: { location: "Seattle", performance_rating: 5 }, options: { sort_by: "hireDate", output_format: "detailed" } })`
  - Salary search: `search_employees({ query: { salary_min: 100000 }, options: { include_sensitive: true } })`

### request_global_leave
Submit a global leave request for employees traveling to multiple countries
- Parameters:
  - `employee_id`: (string, required) The ID of the employee requesting leave
  - `start_date`: (string, required) Start date of the leave (YYYY-MM-DD)
  - `end_date`: (string, required) End date of the leave (YYYY-MM-DD)
  - `reason`: (string, required) Reason for the leave request
  - `countries`: (array of strings, required) Countries for which leave is being requested (e.g., ["USA", "UK"])
  - `contact_info`: (object, optional) Contact information during leave
    - `email`: (string, optional) Contact email during leave
    - `phone`: (string, optional) Contact phone during leave
    - `emergency_contact`: (string, optional) Emergency contact during leave

- Examples:
  - Basic request: `request_global_leave({ employee_id: "E002", start_date: "2025-05-01", end_date: "2025-05-15", reason: "Family vacation", countries: ["USA", "UK"] })`
  - With contact info: `request_global_leave({ employee_id: "E002", start_date: "2025-05-01", end_date: "2025-05-15", reason: "Family vacation", countries: ["USA", "UK"], contact_info: { email: "bob.vacation@example.com", phone: "+1-555-123-4567" } })`

## Employee Data Structure
The HR system contains comprehensive employee records with the following fields:
- Basic info: id, name, department, title, email, phoneNumber, dob
- Location: city, state, country
- Employment: hireDate, yearsInCompany, performanceRating, salary
- Organization: manager, directReports
- Professional: skills, certifications, educationLevel, projectAssignments
- History: previousPositions, lastPromotionDate
- Benefits: healthInsurance, dentalInsurance, visionInsurance, retirement401k, stockOptions
- Leave: vacationDays (total, used, remaining), sickDays (total, used, remaining)
- Emergency contact: name, relationship, phoneNumber
- Other: ssn (sensitive), notes

## Available Departments
Engineering, Human Resources, Finance, Marketing, Sales, Customer Support, Product, Legal

## Executive Leadership
- Alice Smith (E001): HR Director
- Leo Morgan (E012): Chief Technology Officer
- Amanda Hughes (E027): Chief Financial Officer
- Benjamin Wright (E028): General Counsel
- Quincy Adams (E017): Marketing Director
- Samuel Jackson (E019): Sales Manager
- Wendy Mitchell (E023): Customer Support Director