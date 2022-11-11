import type { NextPage } from "next";
import Head from "next/head";
import GrammarCheckComponent from "../../../components/grammar/grammar";
import { models } from "../../../components/grammar/models";

const GrammarCheck: NextPage = () => {
  return (
    <>
      <Head>
        <title>Standalone grammar correction - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Standalone grammar correction</h2>
          <div className="col s12">
            <h6>About the demo</h6>
            <p>
              In this demo you can work with the models for grammatical error
              correction in English. There are two models available -{" "}
              <a
                href="https://huggingface.co/google/t5-efficient-mini"
                target="_blank"
              >
                T5-Efficient-MINI
              </a>{" "}
              (31M parameters) and{" "}
              <a
                href="https://huggingface.co/google/t5-efficient-tiny"
                target="_blank"
              >
                T5-Efficient-TINY
              </a>{" "}
              (16M parameters). Both models were trained on a portion (due to
              the time constraints) of the{" "}
              <a
                href="https://ai.googleblog.com/2021/08/the-c4200m-synthetic-dataset-for.html"
                target="_blank"
              >
                C4_200M dataset
              </a>{" "}
              (37M training samples and 37M validation samples). In addition to
              the original errors of the dataset, more basic typos were
              dynamically introduced to the training set with the help of{" "}
              <a href="https://github.com/makcedward/nlpaug" target="_blank">
                nlpaug
              </a>{" "}
              library. As a result, T5-Efficient-TINY reached validation loss of
              0.08 and T5-Efficient-MINI achieved validation loss of 0.06.
            </p>
            <p>
              Both models are available in original and quantinized variants.
              Models export to ONNX format was performed using{" "}
              <a href="https://github.com/Ki6an/fastT5" target="_blank">
                fastT5
              </a>{" "}
              library. Exported models were quantinized using standard PyTorch
              functionality.
            </p>
            <h6>How to use the demo:</h6>
            <p>
              Load the model and start typing. The model will run as soon as you
              stop typing.
            </p>
          </div>
        </div>
        <div className="row">
          <GrammarCheckComponent models={models} />
        </div>
      </div>
    </>
  );
};

export default GrammarCheck;
