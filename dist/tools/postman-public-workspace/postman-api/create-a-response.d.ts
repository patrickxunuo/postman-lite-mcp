/**
 * Tool configuration for creating a response in a Postman collection.
 * @type {Object}
 */
declare const apiTool: {
    function: ({ collectionId, parentRequestId, name, responseCode, headers }: {
        collectionId: any;
        parentRequestId: any;
        name: any;
        responseCode: any;
        headers: any;
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
                    parentRequestId: {
                        type: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        description: string;
                    };
                    responseCode: {
                        type: string;
                        properties: {
                            code: {
                                type: string;
                                description: string;
                            };
                            name: {
                                type: string;
                                description: string;
                            };
                        };
                        required: string[];
                    };
                    headers: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                key: {
                                    type: string;
                                    description: string;
                                };
                                value: {
                                    type: string;
                                    description: string;
                                };
                            };
                            required: string[];
                        };
                        description: string;
                    };
                };
                required: string[];
            };
        };
    };
};
export { apiTool };
//# sourceMappingURL=create-a-response.d.ts.map