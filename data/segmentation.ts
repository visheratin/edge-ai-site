import { modelMetadata } from "./modelMeta";

export const segmentationModels: modelMetadata[] = [
    {
        title: "Small model",
        modelPath: "/_next/static/chunks/pages/model_quant.onnx",
        classes: [
            {
                name: "Right-handed",
                color: [163, 255, 0]
            },
            {
                name: "Left-handed",
                color: [245, 0, 255]
            }
        ]
    },
    {
        title: "Larger model",
        modelPath: "/_next/static/chunks/pages/model_quant-1.onnx",
        classes: [
            {
                name: "Right-handed",
                color: [163, 255, 0]
            },
            {
                name: "Left-handed",
                color: [245, 0, 255]
            }
        ]
    }
]