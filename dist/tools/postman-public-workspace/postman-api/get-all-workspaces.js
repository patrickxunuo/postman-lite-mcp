/**
 * Function to get all workspaces from the Postman API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.type] - The type of workspaces to retrieve (e.g., 'personal', 'team', 'private', 'public', 'partner').
 * @param {string} [args.include] - Additional information to include (e.g., 'collections', 'environments', 'mocks', 'monitors').
 * @param {string} [args.apiKey] - Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.
 * @returns {Promise<Object>} - The result of the workspaces retrieval.
 */
const executeFunction = async ({ type, include, apiKey }) => {
    const baseUrl = 'https://api.getpostman.com';
    // Use provided apiKey or fall back to environment variable
    const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    if (!authKey) {
        return { error: 'API key is required. Please provide it as a parameter or set POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable' };
    }
    try {
        // Construct the URL with query parameters
        const url = new URL(`${baseUrl}/workspaces`);
        // Add optional query parameters
        if (type) {
            url.searchParams.append('type', type);
        }
        if (include) {
            url.searchParams.append('include', include);
        }
        // Set up headers for the request
        const headers = {
            'X-API-Key': authKey,
            'Accept': 'application/vnd.api.v10+json'
        };
        // Perform the fetch request
        const response = await fetch(url.toString(), {
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
        console.error('Error retrieving workspaces:', error);
        return { error: 'An error occurred while retrieving workspaces.' };
    }
};
/**
 * Tool configuration for getting all workspaces from the Postman API.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'get_all_workspaces',
            description: 'Get information about all workspaces accessible to the user from the Postman API.',
            parameters: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['personal', 'team', 'private', 'public', 'partner'],
                        description: 'Filter workspaces by type.'
                    },
                    include: {
                        type: 'string',
                        description: 'Include additional information (comma-separated values: collections, environments, mocks, monitors).'
                    },
                    apiKey: {
                        type: 'string',
                        description: 'Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.'
                    }
                },
                required: []
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=get-all-workspaces.js.map