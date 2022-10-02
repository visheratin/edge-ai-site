import { Metadata } from "./metadata";

export const grammarModels: Metadata[] = [
    {
        title: "T5 Efficient TINY",
        models: new Map<string, string>([
            ["encoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/encoder.onnx"],
            ["decoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/decoder.onnx"],
            ["init-decoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/decoder-init.onnx"],
        ]),
        tokenizer: "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
        examples: []
    },
    {
        title: "T5 Efficient TINY quantinized",
        models: new Map<string, string>([
            ["encoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/encoder-quant.onnx"],
            ["decoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/decoder-quant.onnx"],
            ["init-decoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/decoder-init-quant.onnx"],
        ]),
        tokenizer: "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
        examples: []
    },
    {
        title: "T5 Efficient MINI quantinized",
        models: new Map<string, string>([
            ["encoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-encoder-quant.onnx"],
            ["decoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-decoder-quant.onnx"],
            ["init-decoder", "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/mini-decoder-init-quant.onnx"],
        ]),
        tokenizer: "https://edge-ai-models.s3.us-east-2.amazonaws.com/grammar/tokenizer.json",
        examples: []
    }
]