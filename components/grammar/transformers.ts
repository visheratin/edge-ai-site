import * as ort from 'onnxruntime-web';

interface GenerateOptions {
    maxLength: number
    topK: number
}

class T5ForConditionalGeneration {
    encoderSession: ort.InferenceSession
    initDecoderSession: ort.InferenceSession
    decoderSession: ort.InferenceSession

    constructor(encoderSession: ort.InferenceSession, initDecoderSession: ort.InferenceSession, decoderSession: ort.InferenceSession) {
        this.encoderSession = encoderSession
        this.initDecoderSession = initDecoderSession
        this.decoderSession = decoderSession
    }

    async generate(inputTokenIds: number[], options: GenerateOptions): Promise<number[]> {
        const maxLength = options.maxLength || 100;
        const topK = options.topK || 0;
        const startOfDecoderTokenId = 0;
        const endOfDecoderTokenId = 1;
        let encoderOutputs = null;
        let pastKeyValues = null;
        let numOutputTokens = 1;
        let shouldContinue = true;
        const maxOutputTokens = numOutputTokens + maxLength;
        let sampler = (x: ort.Tensor) => this.sampleLogitsGreedily(x);
        if (topK > 0) {
            sampler = (x: ort.Tensor) => this.sampleLogitsTopK(x, topK);
        }
        let outputTokenIds = [startOfDecoderTokenId];
        while (shouldContinue && numOutputTokens < maxOutputTokens) {
            let output = await this.forward(inputTokenIds, outputTokenIds, encoderOutputs, pastKeyValues);
            pastKeyValues = output.pastKeyValues;
            encoderOutputs = output.encoderOutputs;
            let newTokenId = sampler(output.logits);
            outputTokenIds.push(newTokenId);
            numOutputTokens++;
            if (newTokenId === endOfDecoderTokenId) {
                break;
            }
        }
        return outputTokenIds;
    }

    sampleLogitsGreedily(logits: ort.Tensor) {
        let shape = logits.dims;
        let [batchSize, seqLength, vocabSize] = shape;
        let n = batchSize * seqLength * vocabSize;
        let startIndex = n - vocabSize;
        let argmaxi = 0;
        let argmax = logits.data[startIndex + argmaxi];
        for (let i = 1; i < vocabSize; i++) {
            let l = logits.data[startIndex + i];
            if (l > argmax) {
                argmaxi = i;
                argmax = l;
            }
        }
        return argmaxi;
    }

    sampleLogitsTopK(logits: ort.Tensor, k: number) {
        let shape = logits.dims;
        let [batchSize, seqLength, vocabSize] = shape;
        let n = batchSize * seqLength * vocabSize;
        let startIndex = n - vocabSize;
        let logs = logits.data.slice(startIndex);
        k = Math.min(k, vocabSize);
        let logitAndId = Array.from(logs).map((x, i) => [x, i])
            .sort((a, b) => b[0] - a[0]);
        const sMin = Math.exp(-100.0);
        let sumS = 0.0;
        for (let i = 0; i < logitAndId.length; i++) {
            const s = i < k ? Math.exp(logitAndId[i][0]) : sMin;
            sumS += s;
            logitAndId[i][0] = s;
        }
        let r = Math.random() * sumS;
        for (let i = 0; i < logitAndId.length; i++) {
            r -= logitAndId[i][0];
            if (r <= 0) {
                return logitAndId[i][1];
            }
        }
        return logitAndId[0][1];
    }

    async forward(inputIds: number[], decoderInputIds: number[], encoderOutputs: ort.Tensor, pastKeyValues: number[]): Promise<Seq2SeqLMOutput> {
        const inputIdsTensor = new ort.Tensor("int64", new BigInt64Array(inputIds.map(x => BigInt(x))), [1, inputIds.length]);
        const encoderAttentionMaskTensor = new ort.Tensor("int64", new BigInt64Array(inputIds.length).fill(1n), [1, inputIds.length]);
        if (encoderOutputs === null) {
            const encoderFeeds = {
                "input_ids": inputIdsTensor,
                "attention_mask": encoderAttentionMaskTensor,
            }
            const encoderResults = await this.encoderSession.run(encoderFeeds);
            const encoderHiddenStates = encoderResults.hidden_states;
            encoderOutputs = encoderHiddenStates;
        }
        const decoderInputIdsTensor = new ort.Tensor("int64", new BigInt64Array(decoderInputIds.map(x => BigInt(x))), [1, decoderInputIds.length]);
        const decoderFeeds = {
            "input_ids": decoderInputIdsTensor,
            "encoder_attention_mask": encoderAttentionMaskTensor,
            "encoder_hidden_states": encoderOutputs,
        };
        let logits = null;

        if (pastKeyValues === null) {
            const initDecoderResults = await this.initDecoderSession.run(decoderFeeds);
            logits = initDecoderResults.logits;
            pastKeyValues = this.getPastKeyValues(this.initDecoderSession.outputNames.slice(1), initDecoderResults);
        }
        else {
            for (const [k, v] of pastKeyValues) {
                decoderFeeds[k] = v;
            }
            const decoderResults = await this.decoderSession.run(decoderFeeds);
            logits = decoderResults.logits;
            pastKeyValues = this.getPastKeyValues(this.decoderSession.outputNames.slice(1), decoderResults);
        }
        return new Seq2SeqLMOutput(logits, pastKeyValues, encoderOutputs);
    }

    getPastKeyValues(pkvNames, decoderResults) {
        const pkvs = [];
        for (const i in pkvNames) {
            const k = pkvNames[i];
            const v = decoderResults[k];
            pkvs.push([`pkv_${i}`, v]);
        }
        return pkvs;
    }
}

export default T5ForConditionalGeneration

class Seq2SeqLMOutput {
    logits: number[]
    constructor(logits: number[], pastKeyValues, encoderOutputs) {
        this.logits = logits;
        this.pastKeyValues = pastKeyValues;
        this.encoderOutputs = encoderOutputs;
    }
}

