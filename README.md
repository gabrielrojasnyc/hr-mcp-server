# HR MCP Server

A Model Context Protocol (MCP) server for HR operations built for use with Claude Desktop.

## Overview

This server implements the [Model Context Protocol](https://github.com/anthropics/anthropic-cookbook/tree/main/context_protocol) to provide Claude with structured access to employee data and HR operations.

The HR MCP Server enables Claude to:
- Look up detailed employee information
- Search for employees by various criteria
- Submit and manage global leave requests

## Tools

The server provides the following tools to Claude:

### 1. `get_employee_info`

Retrieves detailed information about a specific employee by ID, including personal details, employment information, skills, benefits, and more.

```javascript
// Example usage:
get_employee_info({ employee_id: "E001" })

// With sensitive information:
get_employee_info({ employee_id: "E001", include_sensitive: true })
```

### 2. `search_employees`

Search for employees by various criteria with flexible matching options. Supports searching by name, department, skills, location, and many other fields.

```javascript
// Basic search:
search_employees({ 
  query: { department: "Engineering" } 
})

// Advanced search:
search_employees({ 
  query: { 
    location: "Seattle", 
    performance_rating: 5 
  }, 
  options: { 
    sort_by: "hireDate", 
    output_format: "detailed" 
  } 
})

// Search with sensitive information:
search_employees({ 
  query: { salary_min: 100000 }, 
  options: { include_sensitive: true } 
})
```

### 3. `request_global_leave`

Submit global leave requests for employees traveling to multiple countries, with approval chains and compliance reminders.

```javascript
// Basic request:
request_global_leave({ 
  employee_id: "E002", 
  start_date: "2025-05-01", 
  end_date: "2025-05-15", 
  reason: "Family vacation", 
  countries: ["USA", "UK"] 
})

// With custom contact info:
request_global_leave({ 
  employee_id: "E002", 
  start_date: "2025-05-01", 
  end_date: "2025-05-15", 
  reason: "Family vacation", 
  countries: ["USA", "UK"], 
  contact_info: { 
    email: "bob.vacation@example.com", 
    phone: "+1-555-123-4567" 
  } 
})
```

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hr-mcp-server.git
cd hr-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

1. Start the server:
```bash
npm start
```

2. Connect Claude Desktop to the server by selecting "Local Tool (via stdio)" as the tool type and using the path to the server's start script.

3. Access employee data and HR tools through Claude's interface.

## Development

- Source code is in `/src` directory
- Employee data is stored in `/src/data/employees.ts`
- The server uses TypeScript with strict typing

To run in development mode:
```bash
npx ts-node-esm src/index.ts
```

## Tech Stack

- TypeScript
- Node.js
- [@modelcontextprotocol/sdk](https://github.com/anthropics/model-context-protocol-sdk-js) - MCP SDK for JavaScript/TypeScript
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation

## License

ISC