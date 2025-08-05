/**
 * Tool configuration for updating a response in a Postman collection.
 * @type {Object}
 */
declare const apiTool: {
    function: ({ collectionId, responseId, body }: {
        collectionId: any;
        responseId: any;
        body: any;
    }) => Promise<unknown>;
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
                    body: {
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
//# sourceMappingURL=update-a-response.d.ts.map