/**
 * Function to get information about a request in a Postman collection.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.collectionId - The ID of the collection.
 * @param {string} args.requestId - The ID of the request.
 * @param {boolean} [args.ids=false] - If true, returns only the request properties that contain ID values.
 * @param {boolean} [args.uid=false] - If true, returns all IDs in UID format (`userId`-`id`).
 * @param {boolean} [args.populate=false] - If true, returns minimal data. If false (default), returns all of a request's contents.
 * @param {string} [args.apiKey] - Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.
 * @returns {Promise<Object>} - The result of the request information retrieval.
 */
const executeFunction = async ({ collectionId, requestId, ids = false, uid = false, populate = false, apiKey }) => {
    const baseUrl = 'https://api.getpostman.com';
    // Use provided apiKey or fall back to environment variable
    const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    if (!authKey) {
        return { error: 'API key is required. Please provide it as a parameter or set POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable' };
    }
    try {
        // Construct the URL with path and query parameters
        const url = new URL(`${baseUrl}/collections/${collectionId}/requests/${requestId}`);
        const params = new URLSearchParams();
        // Add parameters based on their values
        if (ids !== undefined) {
            params.append('ids', ids.toString());
        }
        if (uid !== undefined) {
            params.append('uid', uid.toString());
        }
        if (populate !== undefined) {
            params.append('populate', populate.toString());
        }
        url.search = params.toString();
        // Debug: Log the constructed URL
        console.error('[Debug] Request URL:', url.toString());
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
        console.error('Error getting request information:', error);
        return { error: 'An error occurred while retrieving request information.' };
    }
};
/**
 * Tool configuration for getting request information in a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'get_request',
            description: 'Get information about a request in a Postman collection.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection.'
                    },
                    requestId: {
                        type: 'string',
                        description: 'The ID of the request.'
                    },
                    ids: {
                        type: 'boolean',
                        description: 'If true, returns only the request properties that contain ID values.'
                    },
                    uid: {
                        type: 'boolean',
                        description: 'If true, returns all IDs in UID format (`userId`-`id`).'
                    },
                    populate: {
                        type: 'boolean',
                        description: 'If true, returns minimal data. If false (default), returns all of a request\'s contents including headers, body, tests, etc.'
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
//# sourceMappingURL=get-a-request.js.map