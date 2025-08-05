/**
 * Tool configuration for updating a folder in a Postman collection.
 * @type {Object}
 */
declare const apiTool: {
    function: ({ collectionId, folderId, name, description }: {
        collectionId: any;
        folderId: any;
        name: any;
        description: any;
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
                    folderId: {
                        type: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        description: string;
                    };
                    description: {
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
//# sourceMappingURL=update-a-folder.d.ts.map