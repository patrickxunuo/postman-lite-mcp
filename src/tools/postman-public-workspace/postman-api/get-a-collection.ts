import { ApiTool } from "../../../types.js";

interface GetCollectionArgs {
  collectionId: string;
  access_key?: string;
  model?: string;
  apiKey?: string;
}

/**
 * Function to get information about a collection from the Postman API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.collectionId - The ID of the collection to retrieve.
 * @param {string} [args.access_key] - A collection's read-only access key (optional).
 * @param {string} [args.model] - If set to "minimal", returns only the collection's root-level request and folder IDs. If omitted, returns full collection data.
 * @returns {Promise<Object>} - The result of the collection retrieval.
 */
const executeFunction = async ({ collectionId, access_key, model, apiKey }: GetCollectionArgs) => {
  const baseUrl = 'https://api.getpostman.com';
  
  // Use provided apiKey or fall back to environment variable
  const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;

  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/collections/${collectionId}`);
    
    // Add access_key if provided (for public collections)
    if (access_key) {
      url.searchParams.append('access_key', access_key);
    }
    if (model) {
      url.searchParams.append('model', model);
    }

    // Set up headers for the request
    const headers: Record<string, string> = {
      'X-API-Key': authKey || '',
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
  } catch (error) {
    console.error('Error retrieving collection:', error);
    return { error: 'An error occurred while retrieving the collection.' };
  }
};

/**
 * Tool configuration for getting a collection from the Postman API.
 * @type {Object}
 */
const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_collection',
      description: 'Get information about a collection from the Postman API.',
      parameters: {
        type: 'object',
        properties: {
          collectionId: {
            type: 'string',
            description: 'The ID of the collection to retrieve.'
          },
          access_key: {
            type: 'string',
            description: 'A collection\'s read-only access key (optional).'
          },
          model: {
            type: 'string',
            description: 'If set to "minimal", returns only the collection\'s root-level request and folder IDs. If omitted, returns full collection data.'
          },
          apiKey: {
            type: 'string',
            description: 'Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.'
          }
        },
        required: ['collectionId']
      }
    }
  }
};

export { apiTool };