import { ModelMetadata } from "./modelMeta";

export const grammarModels: ModelMetadata[] = [
    {
        title: "Small model",
        models: new Map<string, string>([
            ["encoder-model", "/_next/static/chunks/pages/model-small.onnx"],
            ["decoder-model", "/_next/static/chunks/pages/model-small.onnx"],
            ["init-decoder-model", "/_next/static/chunks/pages/model-small.onnx"],
        ]),
        classes: [],
        examples: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, enim viverra auctor tempus.",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    }
]