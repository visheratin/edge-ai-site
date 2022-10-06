import { Metadata } from "./metadata";

export const grammarModels: Metadata[] = [
  {
    title: "T5 Efficient TINY quantinized (32 MB)",
    models: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-encoder-quant.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-decoder-init-quant.onnx",
      ],
    ]),
    tokenizer:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
    examples: [],
  },
  {
    title: "T5 Efficient MINI quantinized (55 MB)",
    models: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-encoder-quant.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-decoder-init-quant.onnx",
      ],
    ]),
    tokenizer:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
    examples: [],
  },
  {
    title: "T5 Efficient TINY (122 MB)",
    models: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-encoder.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tiny-decoder-init.onnx",
      ],
    ]),
    tokenizer:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
    examples: [],
  },
  {
    title: "T5 Efficient MINI (214 MB)",
    models: new Map<string, string>([
      [
        "encoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-encoder.onnx",
      ],
      [
        "decoder",
        "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-decoder-init.onnx",
      ],
    ]),
    tokenizer:
      "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
    examples: [],
  },
];
