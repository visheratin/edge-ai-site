import { useRef, useState } from "react";
import { datadogLogs } from "@datadog/browser-logs";
import { FeatureExtractionModel, TextMetadata } from "in-browser-ai";

interface GrammarProps {
  models: TextMetadata[];
}

const FeatureExtractorComponent = (props: GrammarProps) => {
  const [status, setStatus] = useState({ processing: false });
  const [output, setOutput] = useState({ value: "Here will be the output" });
  const input1Ref = useRef<HTMLTextAreaElement>(null);
  const input2Ref = useRef<HTMLTextAreaElement>(null);

  const modelSelectRef = useRef<HTMLSelectElement>(null); // reference for the model selector element

  const [model, setModel] = useState({
    instance: new FeatureExtractionModel(props.models[0]),
  });

  const loadModel = async () => {
    setStatus({ processing: true });
    const selectedIdx = modelSelectRef.current?.selectedIndex as number;
    if (selectedIdx === 0) {
      return;
    }
    const metadata = props.models[selectedIdx - 1];
    const model = new FeatureExtractionModel(metadata);
    const elapsed = await model.init();
    datadogLogs.logger.info("Model was created.", {
      demo: "grammar_check",
      modelPaths: metadata.modelPaths,
      elapsed_seconds: elapsed,
    });
    setModel({ instance: model });
    setStatus({ processing: false });
  };

  const processInput = async () => {
    const value1 = input1Ref.current?.value;
    if (value1 === "" || value1 === undefined) {
      return;
    }
    const value2 = input2Ref.current?.value;
    if (value2 === "" || value2 === undefined) {
      return;
    }
    setStatus({ processing: true });
    const result1 = await model.instance.process(value1);
    if (!result1.cached) {
      datadogLogs.logger.info("Sentence was processed.", {
        demo: "feature_extraction",
        input_length: value1.length,
        elapsed_seconds: result1.elapsed,
        model: model.instance.metadata.title,
        tokens_length: result1.tokensNum,
      });
      console.log(
        `Sentence of length ${value1.length} (${result1.tokensNum} tokens) was processed in ${result1.elapsed} seconds`
      );
    }
    const result2 = await model.instance.process(value2);
    if (!result2.cached) {
      datadogLogs.logger.info("Sentence was processed.", {
        demo: "feature_extraction",
        input_length: value2.length,
        elapsed_seconds: result2.elapsed,
        model: model.instance.metadata.title,
        tokens_length: result2.tokensNum,
      });
      console.log(
        `Sentence of length ${value2.length} (${result2.tokensNum} tokens) was processed in ${result2.elapsed} seconds`
      );
    }
    const sim = cosineSim(result1.result, result2.result);
    setOutput({ value: sim.toString() });
    setStatus({ processing: false });
  };

  const cosineSim = (vector1: number[], vector2: number[]) => {
    let dotproduct = 0;
    let m1 = 0;
    let m2 = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotproduct += vector1[i] * vector2[i];
      m1 += vector1[i] * vector1[i];
      m2 += vector2[i] * vector2[i];
    }
    m1 = Math.sqrt(m1);
    m2 = Math.sqrt(m2);
    const sim = dotproduct / (m1 * m2);
    return sim;
  };

  return (
    <>
      <div className="row">
        <div className="col l10 s12">
          <form action="#">
            <div className="input-field">
              <select
                ref={modelSelectRef}
                className="browser-default"
                id="modelSelect"
                disabled={status.processing}
              >
                <option value="" disabled selected>
                  Select the model
                </option>
                {props.models.map((e, key) => {
                  return <option key={key}>{e.title}</option>;
                })}
              </select>
            </div>
          </form>
        </div>
        <div className="col l2 s12">
          <div className="input-field">
            <button
              className="btn waves-effect waves-light"
              style={{ width: "100%" }}
              onClick={loadModel}
              disabled={status.processing}
            >
              Load
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="progress">
          <div
            className={status.processing ? "indeterminate" : "determinate"}
          ></div>
        </div>
      </div>
      <div className="row">
        <div className="col l12 s12">
          <h6>Text 1</h6>
          <textarea
            ref={input1Ref}
            className="materialize-textarea"
            disabled={
              !model.instance ||
              !model.instance.initialized ||
              status.processing
            }
            placeholder="Type sentence here"
          ></textarea>
        </div>
        <div className="col l12 s12">
          <h6>Text 2</h6>
          <textarea
            ref={input2Ref}
            className="materialize-textarea"
            disabled={
              !model.instance ||
              !model.instance.initialized ||
              status.processing
            }
            placeholder="Type sentence here"
          ></textarea>
        </div>
        <div className="col l2 s12">
          <div className="input-field">
            <button
              className="btn waves-effect waves-light"
              style={{ width: "100%" }}
              onClick={processInput}
              disabled={status.processing}
            >
              Calculate similarity
            </button>
          </div>
        </div>
        <div className="col l12 s12">
          <h6>Output</h6>
          <div
            className="col l12 s12 grey lighten-5"
            style={{ minHeight: "50px" }}
            dangerouslySetInnerHTML={{ __html: output.value }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default FeatureExtractorComponent;
