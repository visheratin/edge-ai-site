export interface modelClass {
    name: string
    color: number[]
}

export interface ModelMetadata {
    title: string
    modelPath: string
    classes: modelClass[]
    examples: string[]
}