import { ApiTool } from "../types.js";

interface ConfigureApiKeyArgs {
  apiKey: string;
}

// This will be set by the server
let setServerApiKey: ((apiKey: string | null) => void) | null = null;

export function setApiKeySetter(setter: (apiKey: string | null) => void) {
  setServerApiKey = setter;
}

const executeFunction = async ({ apiKey }: ConfigureApiKeyArgs) => {
  if (!setServerApiKey) {
    return { error: "Server API key configuration not initialized" };
  }

  if (!apiKey) {
    return { error: "API key is required" };
  }

  // Update server-level API key
  setServerApiKey(apiKey);

  return { 
    message: "Successfully configured Postman API key for this session",
    configured: true
  };
};

const apiTool: ApiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'configure_api_key',
      description: 'Configure the Postman API key for all API requests in this session. Set this once and it will be used for all subsequent API calls.',
      parameters: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            description: 'Postman API key for authenticated requests (get from https://www.postman.com/settings/me/api-keys)'
          }
        },
        required: ['apiKey']
      }
    }
  }
};

export { apiTool };