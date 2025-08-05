/**
 * Function to get information about a specific workspace from the Postman API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.workspaceId - The ID of the workspace to retrieve.
 * @param {string} [args.apiKey] - Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.
 * @returns {Promise<Object>} - The result of the workspace retrieval.
 */
const executeFunction = async ({ workspaceId, apiKey }) => {
    const baseUrl = 'https://api.getpostman.com';
    // Use provided apiKey or fall back to environment variable
    const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    if (!authKey) {
        return { error: 'API key is required. Please provide it as a parameter or set POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable' };
    }
    try {
        // Construct the URL
        const url = `${baseUrl}/workspaces/${workspaceId}`;
        // Set up headers for the request
        const headers = {
            'X-API-Key': authKey,
            'Accept': 'application/vnd.api.v10+json'
        };
        // Perform the fetch request
        const response = await fetch(url, {
            method: 'GET',
            headers
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
        console.error('Error retrieving workspace:', error);
        return { error: 'An error occurred while retrieving the workspace.' };
    }
};
/**
 * Tool configuration for getting a workspace from the Postman API.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'get_a_workspace',
            description: 'Get information about a specific workspace from the Postman API.',
            parameters: {
                type: 'object',
                properties: {
                    workspaceId: {
                        type: 'string',
                        description: 'The ID of the workspace to retrieve.'
                    },
                    apiKey: {
                        type: 'string',
                        description: 'Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.'
                    }
                },
                required: ['workspaceId']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=get-a-workspace.js.map