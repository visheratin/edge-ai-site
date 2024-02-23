import { datadogLogs } from "@datadog/browser-logs";
import { ListTextModels, Seq2SeqModel, ModelType } from "@visheratin/web-ai/text";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";

const GrammarCheck: NextPage = () => {
  const models = ListTextModels(["t5-flan"], ModelType.Seq2Seq);
  const [status, setStatus] = useState({ processing: false });
  const [output, setOutput] = useState({ value: "Here will be the output" });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prefixRef = useRef<HTMLInputElement>(null);

  const modelSelectRef = useRef<HTMLSelectElement>(null); // reference for the model selector element

  const [model, setModel] = useState({
    instance: new Seq2SeqModel(models[0]),
  });

  const loadModel = async () => {
    setStatus({ processing: true });
    const selectedIdx = modelSelectRef.current?.selectedIndex as number;
    if (selectedIdx === 0) {
      return;
    }
    const metadata = models[selectedIdx - 1];
    const model = new Seq2SeqModel(metadata);
    const elapsed = await model.init();
    datadogLogs.logger.info("Model was created.", {
      demo: "flan-t5",
      modelPaths: metadata.modelPaths,
      elapsed_seconds: elapsed,
    });
    setModel({ instance: model });
    setStatus({ processing: false });
  };

  const processInput = async () => {
    const value = inputRef.current?.value;
    if (value === "" || value === undefined) {
      return;
    }
    const op = prefixRef.current?.value;
    if (op === "" || op === undefined) {
      return;
    }
    const input = `${op}: ${value}`;
    setStatus({ processing: true });
    let output = await model.instance.process(input);
    setOutput({ value: output.text[0] });
    setStatus({ processing: false });
  };

  return (
    <>
      <Head>
        <title>Flan T5 - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Flan T5</h2>
          <div className="col s12">
            <h6>About the demo</h6>
          </div>
        </div>
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
                  {models.map((e, key) => {
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
              disabled={
                !model.instance ||
                !model.instance.initialized ||
                status.processing
              }
              placeholder="Start typing here"
            ></textarea>
          </div>
          <div className="col l12 s12">
            <h6>Operation</h6>
            <input
              ref={prefixRef}
              className="materialize-textarea"
              disabled={
                !model.instance ||
                !model.instance.initialized ||
                status.processing
              }
            />
          </div>
          <div className="col l2 s12">
            <div className="input-field">
              <button
                className="btn waves-effect waves-light"
                style={{ width: "100%" }}
                onClick={processInput}
                disabled={status.processing}
              >
                Process
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
      </div>
    </>
  );
};

export default GrammarCheck;
