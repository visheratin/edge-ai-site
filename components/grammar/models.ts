import { Metadata } from "../../lib/text/metadata";

export const models: Metadata[] = [
  {
    title: "T5 Efficient TINY quantized (32 MB)",
    modelPaths: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-encoder-quant.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-decoder-init-quant.onnx",
      ],
    ]),
    tokenizerPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
  },
  {
    title: "T5 Efficient MINI quantized (55 MB)",
    modelPaths: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-encoder-quant.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-decoder-init-quant.onnx",
      ],
    ]),
    tokenizerPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
  },
  {
    title: "T5 Efficient TINY (122 MB)",
    modelPaths: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-encoder.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-decoder-init.onnx",
      ],
    ]),
    tokenizerPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
  },
  {
    title: "T5 Efficient MINI (214 MB)",
    modelPaths: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-encoder.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-decoder-init.onnx",
      ],
    ]),
    tokenizerPath:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
  },
];
