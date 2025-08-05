/**
 * Function to create a response in a Postman collection.
 *
 * @param {Object} args - Arguments for creating the response.
 * @param {string} args.collectionId - The ID of the collection where the response will be created.
 * @param {string} args.parentRequestId - The ID of the parent request associated with the response.
 * @param {string} args.name - The name of the response.
 * @param {Object} args.responseCode - The response code object containing code and name.
 * @param {Array} args.headers - An array of headers for the response.
 * @returns {Promise<Object>} - The result of the response creation.
 */
const executeFunction = async ({ collectionId, parentRequestId, name, responseCode, headers }) => {
    const baseUrl = 'https://api.getpostman.com';
    const apiKey = process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
    try {
        const url = `${baseUrl}/collections/${collectionId}/responses?request=${parentRequestId}`;
        const body = {
            name,
            responseCode,
            headers
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error creating response:', error);
        return { error: 'An error occurred while creating the response.' };
    }
};
/**
 * Tool configuration for creating a response in a Postman collection.
 * @type {Object}
 */
const apiTool = {
    function: executeFunction,
    definition: {
        type: 'function',
        function: {
            name: 'create_response',
            description: 'Create a response in a Postman collection.',
            parameters: {
                type: 'object',
                properties: {
                    collectionId: {
                        type: 'string',
                        description: 'The ID of the collection where the response will be created.'
                    },
                    parentRequestId: {
                        type: 'string',
                        description: 'The ID of the parent request associated with the response.'
                    },
                    name: {
                        type: 'string',
                        description: 'The name of the response.'
                    },
                    responseCode: {
                        type: 'object',
                        properties: {
                            code: {
                                type: 'integer',
                                description: 'The HTTP response code.'
                            },
                            name: {
                                type: 'string',
                                description: 'The name associated with the response code.'
                            }
                        },
                        required: ['code', 'name']
                    },
                    headers: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                key: {
                                    type: 'string',
                                    description: 'The header key.'
                                },
                                value: {
                                    type: 'string',
                                    description: 'The header value.'
                                }
                            },
                            required: ['key', 'value']
                        },
                        description: 'An array of headers for the response.'
                    }
                },
                required: ['collectionId', 'parentRequestId', 'name', 'responseCode']
            }
        }
    }
};
export { apiTool };
//# sourceMappingURL=create-a-response.js.map