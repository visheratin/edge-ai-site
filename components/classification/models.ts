import { Metadata } from "../../lib/image/metadata";

const examples: string[] = [
  "/classification/image-1.jpg",
  "/classification/image-2.jpg",
  "/classification/image-3.jpg",
  "/classification/image-4.jpg",
  "/classification/image-5.jpg",
  "/classification/image-6.jpg",
];

export const models: Metadata[] = [
  {
    title: "MobileViT small (22 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit-small.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "MobileViT extra small (9 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit-x-small.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "MobileViT extra extra small (5 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit-xx-small.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "SegFormer B2 (95 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer-b2.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "SegFormer B2 quantized (24 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer-b2-quant.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "SegFormer B1 (52 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer-b1.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "SegFormer B1 quantized (13 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer-b1-quant.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "SegFormer B0 (14 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer-b0.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_preprocessor_config.json",
    examples: examples,
  },
  {
    title: "SegFormer B0 quantized (4 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer-b0-quant.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/segformer_preprocessor_config.json",
    examples: examples,
  },
];
