// src/utils/logger.ts
/**
 * Logs a message in JSON-RPC format for the MCP server
 * @param message The message to log
 */
export const logMessage = (message) => {
    console.info(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message
        }
    }));
};
/**
 * Logs an error in JSON-RPC format for the MCP server
 * @param message The error message to log
 */
export const logError = (message) => {
    console.error(JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {
            message
        }
    }));
};
