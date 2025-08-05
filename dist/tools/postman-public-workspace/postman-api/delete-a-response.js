/**
 * Function to delete a response in a Postman collection.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.collectionId - The ID of the collection.
 * @param {string} args.responseId - The ID of the response to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ collectionId, responseId }) => {
    const baseUrl = 'https://api.getpostman.com';
    const apiKey = process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    try {
        // Construct the URL for the DELETE request
        const url = `${baseUrl}/collections/${collectionId}/responses/${responseId}`;
        // Set up headers for the request
        const headers = {
            'X-API-Key': apiKey,
            'Accept': 'application/vnd.api.v10+json'
        };
        // Perform the fetch request
        const response = await fetch(url, {
            method: 'DELETE',
            headers
        });
        // Check if the response was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        // Return success message for deletion
        return { message: 'Response deleted successfully.' };
    }
    catch (error) {
        console.error('Error deleting response:', error);
        return { error: 'An error occurred while deleting the response.' };
    }
};
/**
 * Tool configuration for deleting a response in a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'delete_response',
            description: 'Delete a response in a Postman collection.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection.'
                    },
                    responseId: {
                        type: 'string',
                        description: 'The ID of the response to delete.'
                    }
                },
                required: ['collectionId', 'responseId']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=delete-a-response.js.map