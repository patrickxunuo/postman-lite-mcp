/**
 * Function to update a response in a Postman collection.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.collectionId - The ID of the collection.
 * @param {string} args.responseId - The ID of the response to update.
 * @param {Object} args.body - The body of the request containing the updated response details.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ collectionId, responseId, body }) => {
    const baseUrl = 'https://api.getpostman.com';
    const apiKey = process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    try {
        // Construct the URL for the request
        const url = `${baseUrl}/collections/${collectionId}/responses/${responseId}`;
        // Set up headers for the request
        const headers = {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.api.v10+json'
        };
        // Perform the fetch request
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body)
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
        console.error('Error updating response:', error);
        return { error: 'An error occurred while updating the response.' };
    }
};
/**
 * Tool configuration for updating a response in a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'update_response',
            description: 'Update a response in a Postman collection.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection.'
                    },
                    responseId: {
                        type: 'string',
                        description: 'The ID of the response to update.'
                    },
                    body: {
                        type: 'object',
                        description: 'The body of the request containing the updated response details.'
                    }
                },
                required: ['collectionId', 'responseId', 'body']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=update-a-response.js.map