/**
 * Tool configuration for deleting a response in a Postman collection.
 * @type {Object}
 */
declare const apiTool: {
    function: ({ collectionId, responseId }: {
        collectionId: any;
        responseId: any;
    }) => Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
    definition: {
        type: string;
        function: {
            name: string;
            description: string;
            parameters: {
                type: string;
                properties: {
                    collectionId: {
                        type: string;
                        description: string;
                    };
                    responseId: {
                        type: string;
                        description: string;
                    };
                };
                required: string[];
            };
        };
    };
};
export { apiTool };
//# sourceMappingURL=delete-a-response.d.ts.map