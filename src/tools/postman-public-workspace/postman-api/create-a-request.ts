import { ApiTool } from "../../../types.js";

interface CreateRequestArgs {
  collectionId: string;
  name: string;
  url: string;
  method?: string;
  description?: string;
  headers?: string;
  queryParams?: any[];
  pathVariables?: any;
  pathVariableData?: any[];
  dataMode?: string;
  dataOptions?: any;
  rawModeData?: string;
  protocolProfileBehavior?: any;
  apiKey?: string;
}

/**
 * Function to create a request in a Postman collection.
 */
const executeFunction = async ({ 
  collectionId, 
  name, 
  url, 
  method = 'GET',
  description,
  headers = 'Content-Type: application/json',
  queryParams,
  pathVariables,
  pathVariableData,
  dataMode = 'raw',
  dataOptions = { raw: { language: 'json' } },
  rawModeData,
  protocolProfileBehavior,
  apiKey
}: CreateRequestArgs) => {
  const baseUrl = 'https://api.getpostman.com';
  
  // Use provided apiKey or fall back to environment variable
  const authKey = apiKey || process.env.POSTMAN_PUBLIC_WORKSPACE_API_KEY;
  
  try {
    // Construct the request body with all possible fields
    const requestBody: any = {
      name,
      url,
      method
    };

    // Add optional fields if provided
    if (description) requestBody.description = description;
    if (headers) requestBody.headers = headers;
    if (queryParams) requestBody.queryParams = queryParams;
    if (pathVariables) requestBody.pathVariables = pathVariables;
    if (pathVariableData) requestBody.pathVariableData = pathVariableData;
    if (dataMode) requestBody.dataMode = dataMode;
    if (dataOptions) requestBody.dataOptions = dataOptions;
    if (rawModeData) requestBody.rawModeData = rawModeData;
    if (protocolProfileBehavior) requestBody.protocolProfileBehavior = protocolProfileBehavior;

    // Set up headers for the request
    const reqHeaders: Record<string, string> = {
      'X-API-Key': authKey || '',
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/collections/${collectionId}/requests`, {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify(requestBody)
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
    console.error('Error creating request:', error);
    return { error: 'An error occurred while creating the request.' };
  }
};

/**
 * Tool configuration for creating a request in a Postman collection.
 * @type {Object}
 */
const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_request',
      description: 'Create a request in a Postman collection with full configuration options.',
      parameters: {
        type: 'object',
        properties: {
          collectionId: {
            type: 'string',
            description: 'The UID of the collection where the request will be created (use the uid field from the collection object, not the id field).'
          },
          name: {
            type: 'string',
            description: 'The name of the request.'
          },
          url: {
            type: 'string',
            description: 'The URL for the request (supports variables like :id).'
          },
          method: {
            type: 'string',
            enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
            description: 'The HTTP method for the request (default: GET).'
          },
          description: {
            type: 'string',
            description: 'Description of the request.'
          },
          headers: {
            type: 'string',
            description: 'Headers in format "Key: Value\\n" (one per line). Default: "Content-Type: application/json"'
          },
          queryParams: {
            type: 'array',
            description: 'Array of query parameter objects with key, value, description, enabled.'
          },
          pathVariables: {
            type: 'object',
            description: 'Path variable values as key-value pairs.'
          },
          pathVariableData: {
            type: 'array',
            description: 'Array of path variable definitions with key, value, description.'
          },
          dataMode: {
            type: 'string',
            description: 'Data mode for the request body. Default: "raw"'
          },
          dataOptions: {
            type: 'object',
            description: 'Options for data mode. Default: {raw: {language: "json"}}'
          },
          rawModeData: {
            type: 'string',
            description: 'Request body content as JSON string.'
          },
          protocolProfileBehavior: {
            type: 'object',
            description: 'Protocol behavior settings (e.g., {disableBodyPruning: true}).'
          },
          apiKey: {
            type: 'string',
            description: 'Postman API key. If not provided, will use POSTMAN_PUBLIC_WORKSPACE_API_KEY environment variable.'
          }
        },
        required: ['collectionId', 'name', 'url']
      }
    }
  }
};

export { apiTool };