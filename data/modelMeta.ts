export interface modelClass {
    name: string
    color: number[]
}

export interface modelMetadata {
    title: string
    modelPath: string
    classes: modelClass[]
}