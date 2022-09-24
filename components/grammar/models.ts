import { Metadata } from "./metadata";

export const grammarModels: Metadata[] = [
    {
        title: "Small model",
        models: new Map<string, string>([
            ["encoder-model", "/_next/static/chunks/pages/grammar/encoder.onnx"],
            ["decoder-model", "/_next/static/chunks/pages/grammar/decoder.onnx"],
            ["init-decoder-model", "/_next/static/chunks/pages/grammar/decoder-init.onnx"],
        ]),
        tokenizer: "/_next/static/chunks/pages/grammar/decoder-init.onnx",
        examples: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, enim viverra auctor tempus.",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    }
]