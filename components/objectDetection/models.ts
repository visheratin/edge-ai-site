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
    title: "YOLOS tiny (25 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/yolo/model.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/yolo/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/yolo/preprocessor_config.json",
    examples: examples,
  },
  {
    title: "YOLOS tiny quantized (9 MB)",
    modelPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/yolo/model_quant.onnx",
    configPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/yolo/config.json",
    preprocessorPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/yolo/preprocessor_config.json",
    examples: examples,
  },
];
