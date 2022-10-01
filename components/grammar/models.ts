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
            "Grammar chchcking in browser! Hhow coool is that! Wha doo you think?",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    },
    {
        title: "T5 Efficient TINY quantinized",
        models: new Map<string, string>([
            ["encoder", "/_next/static/chunks/pages/grammar/encoder-quant.onnx"],
            ["decoder", "/_next/static/chunks/pages/grammar/decoder-quant.onnx"],
            ["init-decoder", "/_next/static/chunks/pages/grammar/decoder-init-quant.onnx"],
        ]),
        tokenizer: "/_next/static/chunks/pages/grammar/tokenizer.json",
        examples: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, enim viverra auctor tempus.",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    },
    {
        title: "T5 Efficient MINI",
        models: new Map<string, string>([
            ["encoder", "/_next/static/chunks/pages/grammar/mini-encoder.onnx"],
            ["decoder", "/_next/static/chunks/pages/grammar/mini-decoder.onnx"],
            ["init-decoder", "/_next/static/chunks/pages/grammar/mini-decoder-init.onnx"],
        ]),
        tokenizer: "/_next/static/chunks/pages/grammar/tokenizer.json",
        examples: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, enim viverra auctor tempus.",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    },
    {
        title: "T5 Efficient MINI quantinized",
        models: new Map<string, string>([
            ["encoder", "/_next/static/chunks/pages/grammar/mini-encoder-quant.onnx"],
            ["decoder", "/_next/static/chunks/pages/grammar/mini-decoder-quant.onnx"],
            ["init-decoder", "/_next/static/chunks/pages/grammar/mini-decoder-init-quant.onnx"],
        ]),
        tokenizer: "/_next/static/chunks/pages/grammar/tokenizer.json",
        examples: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus, enim viverra auctor tempus.",
            "Morbi elit mi, accumsan vitae elementum tincidunt, feugiat sed risus."
        ]
    }
]