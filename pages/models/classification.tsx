import type { NextPage } from "next";
import Head from "next/head";
import ClassificationComponent from "../../components/classification/classification";
import { models } from "../../components/classification/models";

const SEMSegmentation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Images classification - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Images classification</h2>
          <div className="col s12">
            {/* <h6>About the demo</h6>
            <p>
              In this demo you can try models for general semantic segmentation
              of indoor and outdoor scenes. There are three{" "}
              <a href="https://arxiv.org/abs/2105.15203" target="_blank">
                SegFormer
              </a>{" "}
              models available - B0 (3.8M parameters), B1 (13.7M parameters),
              and B4 (64.1M parameters). Pre-trained models from Hugging Face
              hub (
              <a
                href="https://huggingface.co/nvidia/segformer-b0-finetuned-ade-512-512"
                target="_blank"
              >
                B0
              </a>
              ,{" "}
              <a
                href="https://huggingface.co/nvidia/segformer-b1-finetuned-ade-512-512"
                target="_blank"
              >
                B1
              </a>
              , and{" "}
              <a
                href="https://huggingface.co/nvidia/segformer-b4-finetuned-ade-512-512"
                target="_blank"
              >
                B4
              </a>
              ) were exported to ONNX format and quantinized using standard
              PyTorch functionality. All models were originally trained on the{" "}
              <a
                href="https://groups.csail.mit.edu/vision/datasets/ADE20K/"
                target="_blank"
              >
                ADE20K
              </a>{" "}
              dataset.
            </p> */}
            <h6>How to use the demo:</h6>
            <ol>
              <li>Select the model and load it.</li>
              <li>
                Load the image from the device, or select one of example images.
              </li>
              <li>Classes will be displayed below the image.</li>
            </ol>
          </div>
        </div>
        <div className="row">
          <ClassificationComponent models={models} />
        </div>
      </div>
    </>
  );
};

export default SEMSegmentation;
