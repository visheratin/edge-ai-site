export interface ModelClass {
    name: string
    color: number[]
}

export interface ModelMetadata {
    title: string
    models: Map<string, string>
    classes: ModelClass[]
    examples: string[]
}