import { ChangeEvent, useRef, useState } from "react";
import { datadogLogs } from "@datadog/browser-logs";
import { Seq2SeqModel, TextMetadata } from "@visheratin/web-ai/text";
import { split } from "sentence-splitter";

interface SentencePart {
  type: string;
  value: string;
}

const Diff = require("diff");

interface GrammarProps {
  models: TextMetadata[];
}

const GrammarCheckComponent = (props: GrammarProps) => {
  const [status, setStatus] = useState({ processing: false });
  const [output, setOutput] = useState({ value: "Here will be the output" });
  const [diff, setDiff] = useState({ value: "" });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputTimeout, setInputTimeout] = useState({ value: null });

  const modelSelectRef = useRef<HTMLSelectElement>(null); // reference for the model selector element

  const [model, setModel] = useState({
    instance: new Seq2SeqModel(props.models[0]),
  });

  const loadModel = async () => {
    setStatus({ processing: true });
    const selectedIdx = modelSelectRef.current?.selectedIndex as number;
    if (selectedIdx === 0) {
      return;
    }
    const metadata = props.models[selectedIdx - 1];
    const model = new Seq2SeqModel(metadata);
    const elapsed = await model.init();
    datadogLogs.logger.info("Model was created.", {
      demo: "grammar_check",
      modelPaths: metadata.modelPaths,
      elapsed_seconds: elapsed,
    });
    setModel({ instance: model });
    setStatus({ processing: false });
  };

  const inputChanged = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (inputTimeout.value) {
      clearTimeout(inputTimeout.value);
    }
    let timeout = setTimeout(processInput, 750);
    setInputTimeout({ value: timeout });
  };

  const splitText = (text: string): Array<SentencePart> => {
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

  const processInput = async () => {
    const value = inputRef.current?.value;
    if (value === "" || value === undefined) {
      return;
    }
    setStatus({ processing: true });
    let textParts = splitText(value);
    let output = "";
    for (let part of textParts) {
      if (part.type === "Str") {
        if (part.value.length < 2) {
          output = output.concat(part.value);
        } else {
          const partOutput = await model.instance.process(value);
          output = output.concat(partOutput.text[0]);
          if (!partOutput.cached) {
            datadogLogs.logger.info("Sentence was processed.", {
              demo: "grammar_check",
              input_length: part.value.length,
              elapsed_seconds: partOutput.elapsed,
              model: model.instance.metadata.title,
              tokens_length: partOutput.tokensNum,
            });
            console.log(
              `Sentence of length ${part.value.length}(${partOutput.tokensNum} tokens) was processed in ${partOutput.elapsed} seconds`
            );
          }
        }
      } else {
        if (!output.endsWith(part.value)) {
          output = output.concat(part.value);
        }
      }
    }
    setOutput({ value: output });
    const diff = Diff.diffChars(value, output);
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
