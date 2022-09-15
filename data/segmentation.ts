import { ModelMetadata } from "./modelMeta";

export const segmentationModels: ModelMetadata[] = [
    {
        title: "Small ORT model",
        modelPath: "/_next/static/chunks/pages/model_quant.ort",
        classes: [
            {
                name: "Background",
                color: [0, 0, 0, 0]
            },
            {
                name: "Right-handed",
                color: [163, 255, 0, 100]
            },
            {
                name: "Left-handed",
                color: [245, 0, 255, 100]
            }
        ],
        examples: [
            "/sem-segment/image-1.png",
            "/sem-segment/image-2.png",
            "/sem-segment/image-3.png"
        ]
    },
    {
        title: "Small model",
        modelPath: "/_next/static/chunks/pages/model_quant.onnx",
        classes: [
            {
                name: "Background",
                color: [0, 0, 0, 0]
            },
            {
                name: "Right-handed",
                color: [163, 255, 0, 100]
            },
            {
                name: "Left-handed",
                color: [245, 0, 255, 100]
            }
        ],
        examples: [
            "/sem-segment/image-1.png",
            "/sem-segment/image-2.png",
            "/sem-segment/image-3.png"
        ]
    },
    {
        title: "Larger model",
        modelPath: "/_next/static/chunks/pages/model_quant-1.onnx",
        classes: [
            {
                name: "Background",
                color: [0, 0, 0, 0]
            },
            {
                name: "Right-handed",
                color: [163, 255, 0, 100]
            },
            {
                name: "Left-handed",
                color: [245, 0, 255, 100]
            }
        ],
        examples: [
            "/sem-segment/image-1.png",
            "/sem-segment/image-2.png",
            "/sem-segment/image-3.png"
        ]
    }
]