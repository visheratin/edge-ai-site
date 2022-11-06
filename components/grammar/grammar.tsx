import { useRef, useState } from "react";
import { datadogLogs } from "@datadog/browser-logs";
import { SentenceMetrics, Seq2SeqModel } from "../../lib/text/model";
import { Metadata } from "../../lib/text/metadata";

const Diff = require("diff");

interface GrammarProps {
  models: Metadata[];
}

const GrammarCheckComponent = (props: GrammarProps) => {
  const [status, setStatus] = useState({ processing: false });
  const [output, setOutput] = useState({ value: "Here will be the output" });
  const [diff, setDiff] = useState({ value: "" });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputTimeout, setInputTimeout] = useState({ value: null });

  const modelSelectRef = useRef<HTMLSelectElement>(null); // reference for the model selector element

  const [model, setModel] = useState({
    instance: new Seq2SeqModel({}),
  });

  const loadModel = async () => {
    setStatus({ processing: true });
    const selectedIdx = modelSelectRef.current?.selectedIndex;
    if (selectedIdx === 0) {
      return;
    }
    const metadata = props.models[selectedIdx - 1];
    const model = new Seq2SeqModel(metadata);
    const elapsed = await model.init();
    datadogLogs.logger.info("Model was created.", {
      modelPath: metadata.modelPath,
      elapsed_seconds: elapsed,
    });
    setModel({ instance: model });
    setStatus({ processing: false });
  };

  const inputChanged = async (e: Event) => {
    e.preventDefault();
    if (inputTimeout.value) {
      clearTimeout(inputTimeout.value);
    }
    let timeout = setTimeout(processInput, 750);
    setInputTimeout({ value: timeout });
  };

  const processInput = async () => {
    const value = inputRef.current?.value;
    if (value === "" || value === undefined) {
      return;
    }
    const result = await model.instance.process(value);
    setOutput({ value: result.result });
    const diff = Diff.diffChars(value, result.result);
    let diffValue = "";
    diff.forEach((part) => {
      if (part.added) {
        diffValue += `<span style="color: green; font-weight: bold">${part.value}</span>`;
      } else if (part.removed) {
        diffValue += `<span style="color: red; font-weight: bold">${part.value}</span>`;
      } else {
        diffValue += `${part.value}`;
      }
    });
    setDiff({ value: diffValue });
    setStatus({ processing: false });
    result.metrics.forEach((metric: SentenceMetrics) => {
      datadogLogs.logger.info("Sentence was processed.", {
        input_length: metric.length,
        elapsed_seconds: metric.elapsed,
        model: model.instance.metadata.title,
        tokens_length: metric.tokensNum,
      });
      console.log(
        `Sentence of length ${metric.length}(${metric.tokensNum} tokens) was processed in ${metric.elapsed} seconds`
      );
    });
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
          <h6>Input</h6>
          <textarea
            ref={inputRef}
            className="materialize-textarea"
            onChange={inputChanged}
            disabled={
              !model.instance ||
              !model.instance.initialized ||
              status.processing
            }
            placeholder="Start typing here"
          ></textarea>
        </div>
        <div className="col l12 s12">
          <h6>Output</h6>
          <div
            className="col l12 s12 grey lighten-5"
            style={{ minHeight: "50px" }}
            dangerouslySetInnerHTML={{ __html: output.value }}
          ></div>
        </div>
        <div className="col l12 s12">
          <h6>Difference between input and output</h6>
          <div
            className="col l12 s12 grey lighten-5"
            style={{ minHeight: "50px" }}
            dangerouslySetInnerHTML={{ __html: diff.value }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default GrammarCheckComponent;
