import { createSession } from "../session";
import Tokenizer from "./tokenizer";
import { Metadata } from "./metadata";
import { split } from "sentence-splitter";
import T5ForConditionalGeneration from "./transformers";

interface SentencePart {
  type: string;
  value: string;
}

export interface SentenceMetrics {
  length: number;
  tokensNum: number;
  elapsed: number;
}

interface TextPartOutput {
  text: string;
  inputLength: number;
  tokensLength: number;
  elapsed: number;
}

export type Seq2SeqResult = {
  result: string;
  metrics: Array<SentenceMetrics>;
};

export class Seq2SeqModel {
  metadata: Metadata;
  initialized: boolean;
  private tokenizer: Tokenizer | null;
  private model: T5ForConditionalGeneration | null;
  private cache: Map<string, string>;

  constructor(metadata: Metadata) {
    this.metadata = metadata;
    this.initialized = false;
    this.cache = new Map<string, string>();
    this.model = null;
    this.tokenizer = null;
  }

  init = async (): Promise<number> => {
    const start = new Date();
    const encoderPath = this.metadata.modelPaths.get("encoder");
    if (!encoderPath) {
      throw new Error("model paths do not have the 'encoder' path");
    }
    const encoderSession = await createSession(encoderPath);
    const decoderPath = this.metadata.modelPaths.get("decoder");
    if (!decoderPath) {
      throw new Error("model paths do not have the 'decoder' path");
    }
    const decoderSession = await createSession(decoderPath);
    this.model = new T5ForConditionalGeneration(encoderSession, decoderSession);
    const response = await fetch(this.metadata.tokenizerPath);
    this.tokenizer = Tokenizer.fromConfig(await response.json());
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    this.initialized = true;
    return elapsed;
  };

  process = async (input: string): Promise<Seq2SeqResult> => {
    let result: Seq2SeqResult = {
      result: "",
      metrics: new Array<SentenceMetrics>(),
    };
    let textParts = this.splitText(input);
    let output = "";
    for (let part of textParts) {
      if (part.type === "Str") {
        if (this.cache.has(part.value)) {
          output = output.concat(this.cache.get(part.value) as string);
        } else {
          if (part.value.length < 2) {
            output = output.concat(part.value);
          } else {
            const partOutput = await this.processTextPart(part.value);
            output = output.concat(partOutput.text);
            this.cache.set(part.value, partOutput.text);
            result.metrics.push({
              length: partOutput.inputLength,
              tokensNum: partOutput.tokensLength,
              elapsed: partOutput.elapsed,
            });
          }
        }
      } else {
        if (!output.endsWith(part.value)) {
          output = output.concat(part.value);
        }
      }
    }
    result.result = output;
    return result;
  };

  splitText = (text: string): Array<SentencePart> => {
    let parts = split(text);
    let result: Array<SentencePart> = new Array<SentencePart>();
    for (let part of parts) {
      if (part.type === "Sentence") {
        for (let childNode of part.children) {
          result.push({ type: childNode.type, value: childNode.value });
        }
      } else {
        result.push({ type: part.type, value: part.value });
      }
    }
    return result;
  };

  processTextPart = async (input: string): Promise<TextPartOutput> => {
    const generationOptions = {
      maxLength: 500,
      topK: 0,
    };
    const inputTokenIds = this.tokenizer?.encode(input);
    const start = new Date();
    const outputTokenIds = await this.model?.generate(
      inputTokenIds,
      generationOptions
    );
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    let output: string = this.tokenizer?.decode(outputTokenIds, true).trim();
    output = output.trim();
    return {
      text: output,
      inputLength: input.length,
      tokensLength: inputTokenIds?.length!,
      elapsed: elapsed,
    };
  };
}
