import { ListTextModels, TextModelType } from "in-browser-ai";
import type { NextPage } from "next";
import Head from "next/head";
import FeatureExtractionComponent from "../../components/textFeatures/featureExtractor";

const GrammarCheck: NextPage = () => {
  const models = ListTextModels(undefined, TextModelType.FeatureExtraction);
  return (
    <>
      <Head>
        <title>Text feature extraction - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Text feature extraction</h2>
          <div className="col s12">
            <h6>About the demo</h6>
            <p>
              In this demo, you can check out the models for features extraction
              for the text. There are two models available -{" "}
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
              (16M parameters). Both models were trained on a colossal, cleaned
              version of Common Crawl's web crawl corpus.
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
            <p>
              What happens under the hood: the model generates embedding vectors
              for both pieces of text and then calculates the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Cosine_similarity"
                target="_blank"
              >
                cosine similarity
              </a>{" "}
              between these vectors.
            </p>
            <h6>How to use the demo:</h6>
            <ol>
              <li>Select the model and load it.</li>
              <li>Type in the first piece of text.</li>
              <li>Type in the second piece of text.</li>
              <li>Click "Calculate similarity".</li>
              <li>
                The output will contain the score where 1 is when the text
                pieces are the same and -1 is when the text pieces are
                completely different.
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <FeatureExtractionComponent models={models} />
        </div>
      </div>
    </>
  );
};

export default GrammarCheck;
