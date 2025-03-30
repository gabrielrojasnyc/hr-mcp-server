# HR MCP Server

A Model Context Protocol (MCP) server for HR operations built for use with Claude Desktop.



https://github.com/user-attachments/assets/4cb89115-daf2-4647-81d2-aadd9e0dd29e



## Overview

This server implements the [Model Context Protocol](https://github.com/anthropics/anthropic-cookbook/tree/main/context_protocol) to provide Claude with structured access to employee data and HR operations.

The HR MCP Server enables Claude to:
- Look up detailed employee information
- Search for employees by various criteria
- Submit and manage global leave requests
- Translate text with HR/HCM context awareness

For a detailed architectural overview, see [ARCHITECTURE.md](./ARCHITECTURE.md).

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

### 4. Translation Prompt: `translate_text`

Translates text from any language to a specified target language with automatic source language detection and special focus on HR/HCM terminology.

```javascript
// Basic translation:
translate_text({ 
  text: "Les employés doivent soumettre leurs feuilles de temps avant la fin de la période.", 
  target_language: "English" 
})
```

The translation system handles HR-specific terminology with contextual awareness, preserving the technical meaning of terms like "benefits," "period," "check," "position," etc., which have special meanings in Human Capital Management contexts.

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

## Code Structure

The server is organized with a focus on clean, maintainable code:

- **Centralized logging** - Consistent JSON-RPC formatted logging
- **Tool-based architecture** - Each tool has a clear responsibility
- **Schema validation** - Strong typing with Zod for all inputs
- **Error handling** - Comprehensive validation with clear error messages
- **Documentation** - Inline comments explaining complex logic

## License

MIT

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
