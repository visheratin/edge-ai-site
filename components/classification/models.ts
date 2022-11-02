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
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit-small-original.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/preprocessor_config.json",
    examples: examples,
  },
  {
    title: "MobileViT extra small (9 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit-x-small-original.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/preprocessor_config.json",
    examples: examples,
  },
  {
    title: "MobileViT extra extra small (5 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/mobilevit-xx-small-original.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/classification/preprocessor_config.json",
    examples: examples,
  },
];
