import { ImageMetadata, ImageModelType } from "in-browser-ai";

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
    type: ImageModelType.Segmentation,
    sizeMB: 4,
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b0.onnx.gz",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
    tags: ["segmentation", "segformer", "microscopy"],
  },
  {
    id: "sem-segformer-b1",
    title: "SegFormer B1",
    description: "",
    type: ImageModelType.Segmentation,
    sizeMB: 14,
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b1.onnx.gz",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
    tags: ["segmentation", "segformer", "microscopy"],
  },
  {
    id: "sem-segformer-b5",
    title: "SegFormer B5",
    description: "",
    type: ImageModelType.Segmentation,
    sizeMB: 85,
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b5.onnx.gz",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
    tags: ["segmentation", "segformer", "microscopy"],
  },
];
