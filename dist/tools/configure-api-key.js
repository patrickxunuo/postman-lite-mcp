// This will be set by the server
let setServerApiKey = null;
export function setApiKeySetter(setter) {
    setServerApiKey = setter;
}
const executeFunction = async ({ apiKey }) => {
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
const apiTool = {
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
//# sourceMappingURL=configure-api-key.js.map