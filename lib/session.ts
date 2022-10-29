import * as ort from "onnxruntime-web";

ort.env.wasm.numThreads = 3;
ort.env.wasm.simd = true;
ort.env.wasm.proxy = true;

export const createSession = async (
  modelPath: string
): Promise<ort.InferenceSession> => {
  const model_data = await fetch(modelPath).then((resp) => resp.arrayBuffer());
  const session = await ort.InferenceSession.create(model_data, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
    executionMode: "parallel",
  });
  return session;
};
