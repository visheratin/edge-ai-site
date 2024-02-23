import { ImageMetadata, ModelType } from "@visheratin/web-ai/image";

const semSegmentationExamples: string[] = [
  "/sem-segment/image-1.png",
  "/sem-segment/image-2.png",
  "/sem-segment/image-3.png",
  "/sem-segment/image-4.png",
  "/sem-segment/image-5.png",
  "/sem-segment/image-6.png",
];

export const semSegmentationModels: ImageMetadata[] = [
  {
    id: "sem-segformer-b0",
    title: "SegFormer B0",
    description: "",
    type: ModelType.Segmentation,
    sizeMB: 4,
    modelPaths: new Map<string, string>([
      [
        "model",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b0.onnx.gz",
      ],
    ]),
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
    tags: ["segmentation", "segformer", "microscopy"],
    memEstimateMB: 100,
  },
];
