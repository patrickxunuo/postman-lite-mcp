/**
 * Function to update a folder in a Postman collection.
 *
 * @param {Object} args - Arguments for updating the folder.
 * @param {string} args.collectionId - The ID of the collection containing the folder.
 * @param {string} args.folderId - The ID of the folder to update.
 * @param {string} args.name - The new name for the folder.
 * @param {string} args.description - The new description for the folder.
 * @returns {Promise<Object>} - The result of the folder update.
 */
const executeFunction = async ({ collectionId, folderId, name, description }) => {
    const baseUrl = 'https://api.getpostman.com';
    const apiKey = process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    try {
        // Construct the URL for the request
        const url = `${baseUrl}/collections/${collectionId}/folders/${folderId}`;
        // Set up headers for the request
        const headers = {
            'X-API-Key': apiKey,
            'Accept': 'application/vnd.api.v10+json',
            'Content-Type': 'application/json'
        };
        // Create the request body
        const body = JSON.stringify({
            name,
            description,
            order: [],
            folders_order: []
        });
        // Perform the fetch request
        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body
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
        console.error('Error updating folder:', error);
        return { error: 'An error occurred while updating the folder.' };
    }
};
/**
 * Tool configuration for updating a folder in a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'update_folder',
            description: 'Update a folder in a Postman collection.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection containing the folder.'
                    },
                    folderId: {
                        type: 'string',
                        description: 'The ID of the folder to update.'
                    },
                    name: {
                        type: 'string',
                        description: 'The new name for the folder.'
                    },
                    description: {
                        type: 'string',
                        description: 'The new description for the folder.'
                    }
                },
                required: ['collectionId', 'folderId', 'name', 'description']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=update-a-folder.js.map