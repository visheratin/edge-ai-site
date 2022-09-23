import { ModelMetadata } from "./modelMeta";

export const segmentationModels: ModelMetadata[] = [
    {
        title: "Small model (4 MB)",
        models: new Map<string, string>([
            ["segment-model", "/_next/static/chunks/pages/segment/model-small.onnx"],
        ]),
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
        title: "Larger model (14 MB)",
        models: new Map<string, string>([
            ["segment-model", "/_next/static/chunks/pages/segment/model-larger.onnx"],
        ]),
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
        title: "Large model (85 MB)",
        models: new Map<string, string>([
            ["segment-model", "/_next/static/chunks/pages/segment/model-large.onnx"],
        ]),
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