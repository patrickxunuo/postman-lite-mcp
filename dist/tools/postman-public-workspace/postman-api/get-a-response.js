/**
 * Function to get a response from a collection in Postman.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.collectionId - The ID of the collection.
 * @param {string} args.responseId - The ID of the response.
 * @param {boolean} [args.ids=false] - If true, returns only the response properties that contain ID values.
 * @param {boolean} [args.uid=false] - If true, returns all IDs in UID format.
 * @param {boolean} [args.populate=false] - If true, returns all of a response's contents.
 * @returns {Promise<Object>} - The result of the response retrieval.
 */
const executeFunction = async ({ collectionId, responseId, ids = false, uid = false, populate = false }) => {
    const baseUrl = 'https://api.getpostman.com';
    const apiKey = process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    try {
        // Construct the URL with path variables and query parameters
        const url = new URL(`${baseUrl}/collections/${collectionId}/responses/${responseId}`);
        if (ids)
            url.searchParams.append('ids', 'true');
        if (uid)
            url.searchParams.append('uid', 'true');
        if (populate)
            url.searchParams.append('populate', 'true');
        // Set up headers for the request
        const headers = {
            'X-API-Key': apiKey,
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
        console.error('Error getting response:', error);
        return { error: 'An error occurred while getting the response.' };
    }
};
/**
 * Tool configuration for getting a response from a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'get_response',
            description: 'Get a response from a Postman collection.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection.'
                    },
                    responseId: {
                        type: 'string',
                        description: 'The ID of the response.'
                    },
                    ids: {
                        type: 'boolean',
                        description: 'If true, returns only the response properties that contain ID values.'
                    },
                    uid: {
                        type: 'boolean',
                        description: 'If true, returns all IDs in UID format.'
                    },
                    populate: {
                        type: 'boolean',
                        description: 'If true, returns all of a response\'s contents.'
                    }
                },
                required: ['collectionId', 'responseId']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=get-a-response.js.map