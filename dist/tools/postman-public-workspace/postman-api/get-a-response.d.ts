/**
 * Tool configuration for getting a response from a Postman collection.
 * @type {Object}
 */
declare const apiTool: {
    function: ({ collectionId, responseId, ids, uid, populate }: {
        collectionId: any;
        responseId: any;
        ids?: boolean;
        uid?: boolean;
        populate?: boolean;
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
                    ids: {
                        type: string;
                        description: string;
                    };
                    uid: {
                        type: string;
                        description: string;
                    };
                    populate: {
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
//# sourceMappingURL=get-a-response.d.ts.map