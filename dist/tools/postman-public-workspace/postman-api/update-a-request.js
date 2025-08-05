/**
 * Function to update a request in a Postman collection.
 */
const executeFunction = async ({ collectionId, requestId, name, url, method, description, headers, queryParams, pathVariables, pathVariableData, dataMode, dataOptions, rawModeData, protocolProfileBehavior, apiKey }) => {
    const baseUrl = 'https://api.getpostman.com';
    // Use provided apiKey or fall back to environment variable
    const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    try {
        // Construct the request body with all possible fields
        const requestBody = {};
        // Add optional fields if provided
        if (name !== undefined)
            requestBody.name = name;
        if (url !== undefined)
            requestBody.url = url;
        if (method !== undefined)
            requestBody.method = method;
        if (description !== undefined)
            requestBody.description = description;
        if (headers !== undefined)
            requestBody.headers = headers;
        if (queryParams !== undefined)
            requestBody.queryParams = queryParams;
        if (pathVariables !== undefined)
            requestBody.pathVariables = pathVariables;
        if (pathVariableData !== undefined)
            requestBody.pathVariableData = pathVariableData;
        if (dataMode !== undefined)
            requestBody.dataMode = dataMode;
        if (dataOptions !== undefined)
            requestBody.dataOptions = dataOptions;
        if (rawModeData !== undefined)
            requestBody.rawModeData = rawModeData;
        if (protocolProfileBehavior !== undefined)
            requestBody.protocolProfileBehavior = protocolProfileBehavior;
        // Set up headers for the request
        const reqHeaders = {
            'X-API-Key': authKey || '',
            'Content-Type': 'application/json'
        };
        // Perform the fetch request
        const response = await fetch(`${baseUrl}/collections/${collectionId}/requests/${requestId}`, {
            method: 'PUT',
            headers: reqHeaders,
            body: JSON.stringify(requestBody)
        });
        // Check if the response was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        // Parse and return the response data
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error updating the request:', error);
        return { error: 'An error occurred while updating the request.' };
    }
};
/**
 * Tool configuration for updating a request in a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'update_request',
            description: 'Update a request in a Postman collection with various configuration options.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection containing the request.'
                    },
                    requestId: {
                        type: 'string',
                        description: 'The ID of the request to update.'
                    },
                    name: {
                        type: 'string',
                        description: 'The name of the request.'
                    },
                    url: {
                        type: 'string',
                        description: 'The URL for the request (supports variables like :id).'
                    },
                    method: {
                        type: 'string',
                        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
                        description: 'The HTTP method for the request.'
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the request.'
                    },
                    headers: {
                        type: 'string',
                        description: 'Headers in format "Key: Value\\n" (one per line).'
                    },
                    queryParams: {
                        type: 'array',
                        description: 'Array of query parameter objects with key, value, description, enabled.'
                    },
                    pathVariables: {
                        type: 'object',
                        description: 'Path variable values as key-value pairs.'
                    },
                    pathVariableData: {
                        type: 'array',
                        description: 'Array of path variable definitions with key, value, description.'
                    },
                    dataMode: {
                        type: 'string',
                        description: 'Data mode for the request body (e.g., "raw", "formdata").'
                    },
                    dataOptions: {
                        type: 'object',
                        description: 'Options for data mode (e.g., {raw: {language: "json"}}).'
                    },
                    rawModeData: {
                        type: 'string',
                        description: 'Request body content as JSON string.'
                    },
                    protocolProfileBehavior: {
                        type: 'object',
                        description: 'Protocol behavior settings (e.g., {disableBodyPruning: true}).'
                    },
                    apiKey: {
                        type: 'string',
                        description: 'Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.'
                    }
                },
                required: ['collectionId', 'requestId']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=update-a-request.js.map