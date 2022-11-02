import { Metadata } from "../../lib/image/metadata";

const semSegmentationExamples: string[] = [
  "/sem-segment/image-1.png",
  "/sem-segment/image-2.png",
  "/sem-segment/image-3.png",
  "/sem-segment/image-4.png",
  "/sem-segment/image-5.png",
  "/sem-segment/image-6.png",
];

export const semSegmentationModels: Metadata[] = [
  {
    title: "SegFormer B0 quantized (4 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b0.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
  },
  {
    title: "SegFormer B1 quantized (14 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b1.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
  },
  {
    title: "SegFormer B5 quantized (85 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b5.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/preprocessor_config.json",
    examples: semSegmentationExamples,
  },
];

const generalSegmentationExamples: string[] = [
  "/segment/image-1.jpg",
  "/segment/image-2.jpg",
  "/segment/image-3.jpg",
  "/segment/image-4.jpg",
  "/segment/image-5.jpg",
  "/segment/image-6.jpg",
];

export const generalSegmentationModels: Metadata[] = [
  {
    title: "SegFormer B0 quantized (4 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/b0.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/preprocessor_config.json",
    examples: generalSegmentationExamples,
  },
  {
    title: "SegFormer B1 quantized (14 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/b1.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/preprocessor_config.json",
    examples: generalSegmentationExamples,
  },
  {
    title: "SegFormer B4 quantized (64 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/b4.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/preprocessor_config.json",
    examples: generalSegmentationExamples,
  },
];
