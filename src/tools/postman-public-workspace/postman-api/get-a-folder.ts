import { ApiTool } from "../../../types.js";

interface GetFolderArgs {
  collectionId: string;
  folderId: string;
  ids?: boolean;
  uid?: boolean;
  populate?: boolean;
  apiKey?: string;
}

/**
 * Function to get information about a folder in a Postman collection.
 *
 * @param {Object} args - Arguments for the folder retrieval.
 * @param {string} args.collectionId - The ID of the collection.
 * @param {string} args.folderId - The ID of the folder.
 * @param {boolean} [args.ids=false] - If true, returns only the folder properties that contain ID values.
 * @param {boolean} [args.uid=false] - If true, returns all IDs in UID format.
 * @param {boolean} [args.populate=false] - If true, returns all of a folder's contents.
 * @returns {Promise<Object>} - The result of the folder retrieval.
 */
const executeFunction = async ({ collectionId, folderId, ids = false, uid = false, populate = false, apiKey }: GetFolderArgs) => {
  const baseUrl = 'https://api.getpostman.com';
  
  // Use provided apiKey or fall back to environment variable
  const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${baseUrl}/collections/${collectionId}/folders/${folderId}`);
    const params = new URLSearchParams();
    if (ids) params.append('ids', 'true');
    if (uid) params.append('uid', 'true');
    if (populate) params.append('populate', 'true');
    url.search = params.toString();

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
    console.error('Error retrieving folder information:', error);
    return { error: 'An error occurred while retrieving folder information.' };
  }
};

/**
 * Tool configuration for retrieving folder information in a Postman collection.
 * @type {Object}
 */
const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_folder',
      description: 'Get information about a folder in a Postman collection.',
      parameters: {
        type: 'object',
        properties: {
          collectionId: {
            type: 'string',
            description: 'The ID of the collection.'
          },
          folderId: {
            type: 'string',
            description: 'The ID of the folder.'
          },
          ids: {
            type: 'boolean',
            description: 'If true, returns only the folder properties that contain ID values.'
          },
          uid: {
            type: 'boolean',
            description: 'If true, returns all IDs in UID format.'
          },
          populate: {
            type: 'boolean',
            description: 'If true, returns all of a folder\'s contents.'
          },
          apiKey: {
            type: 'string',
            description: 'Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.'
          }
        },
        required: ['collectionId', 'folderId']
      }
    }
  }
};

export { apiTool };