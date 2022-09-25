import { Metadata } from "./metadata";

export const grammarModels: Metadata[] = [
    {
        title: "T5 Efficient TINY",
        models: new Map<string, string>([
            ["encoder", "/_next/static/chunks/pages/grammar/encoder.onnx"],
            ["decoder", "/_next/static/chunks/pages/grammar/decoder.onnx"],
            ["init-decoder", "/_next/static/chunks/pages/grammar/decoder-init.onnx"],
        ]),
        tokenizer: "/_next/static/chunks/pages/grammar/tokenizer.json",
        examples: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, enim viverra auctor tempus.",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    }
]