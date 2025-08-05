import { ApiTool } from "../../../types.js";

interface DeleteRequestArgs {
  collectionId: string;
  requestId: string;
  apiKey?: string;
}

/**
 * Function to delete a request in a Postman collection.
 *
 * @param {Object} args - Arguments for the delete request.
 * @param {string} args.collectionId - The ID of the collection containing the request.
 * @param {string} args.requestId - The ID of the request to be deleted.
 * @param {string} [args.apiKey] - Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.
 * @returns {Promise<Object>} - The result of the delete request.
 */
const executeFunction = async ({ collectionId, requestId, apiKey }: DeleteRequestArgs) => {
  const baseUrl = 'https://api.getpostman.com';
  
  // Use provided apiKey or fall back to environment variable
  const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/collections/${collectionId}/requests/${requestId}`;

    // Set up headers for the request
    const headers: Record<string, string> = {
      'X-API-Key': authKey || '',
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

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting the request:', error);
    return { error: 'An error occurred while deleting the request.' };
  }
};

/**
 * Tool configuration for deleting a request in a Postman collection.
 * @type {Object}
 */
const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_request',
      description: 'Delete a request in a Postman collection.',
      parameters: {
        type: 'object',
        properties: {
          collectionId: {
            type: 'string',
            description: 'The ID of the collection containing the request.'
          },
          requestId: {
            type: 'string',
            description: 'The ID of the request to be deleted.'
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