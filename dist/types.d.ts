export interface ToolParameters {
    type: 'object';
    properties: Record<string, {
        type: string;
        description: string;
        enum?: string[];
    }>;
    required?: string[];
}
export interface ToolFunction {
    name: string;
    description: string;
    parameters: ToolParameters;
}
export interface ToolDefinition {
    type: 'function';
    function: ToolFunction;
}
export interface ApiTool {
    function: (args: any) => Promise<any>;
    definition: ToolDefinition;
    path?: string;
}
//# sourceMappingURL=types.d.ts.map