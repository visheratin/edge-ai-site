import type { NextPage } from "next";
import Head from "next/head";
import ImageDemos from "./demos/imageDemos";
import TextDemos from "./demos/textDemos";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Modern models, directly in your browser</h2>
          <div className="col s12">
            <p>
              Edge AI is a concept of deploying AI models to the devices that
              produce the data. It can be surveillance cameras placed in remote
              areas, radiology equipment in medical centers, or even your
              laptop. There are multiple benefits from that:
            </p>
            <ol>
              <li>
                <b>Security.</b> When running inference on the device, we ensure
                that the data is not compromised on its way to the remote server
                or the server itself. This is especially important when working
                with{" "}
                <a
                  href="https://developer.nvidia.com/blog/healthcare-at-the-edge/"
                  target="_blank"
                >
                  medical data
                </a>{" "}
                or{" "}
                <a
                  href="https://www.computer.org/csdl/magazine/sp/2021/04/09475182/1uZskexqBJ6"
                  target="_blank"
                >
                  confidential information
                </a>
                .
              </li>
              <li>
                <b>Latency.</b> Even though edge devices are less
                computationally performant than data centers packed with
                high-end hardware, sending the raw data from the device may be
                either slow or unavailable. Examples of this include{" "}
                <a
                  href="https://www.aiacceleratorinstitute.com/shaping-the-future-of-agriculture-with-edge-ai-devices/"
                  target="_blank"
                >
                  agriculture
                </a>{" "}
                and{" "}
                <a href="https://www.seeedstudio.com/blog/2022/08/19/using-grafana-for-real-time-ai-powered-microscopy-image-analysis-at-the-edge/">
                  microscopy
                </a>
                .
              </li>
              <li>
                <b>Cost savings.</b> When models are deployed at the devices,
                you, as a service provider, no longer need to run expensive
                infrastructure to support all your users. You can scale at
                virtually no cost and put more computational resources towards
                developing better models for business needs.
              </li>
            </ol>
            <p>
              With the recent advances in deep learning and MLOps, it becomes
              easier to create ML-powered products and deploy them to edge
              devices. This project explores how well deep learning models work
              in the most common edge software - your browser. All demos on this
              site are built using JavaScript and work in any modern browser -
              desktop and mobile.
            </p>
            <p>
              The foundation of the project is{" "}
              <a
                href="https://cloudblogs.microsoft.com/opensource/2021/09/02/onnx-runtime-web-running-your-machine-learning-model-in-browser/"
                target="_blank"
              >
                ONNX Runtime Web
              </a>{" "}
              - the framework that allows running deep learning models in{" "}
              <a href="https://onnxruntime.ai/index.html" target="_blank">
                ONNX format in the browser
              </a>
              . I used pre-trained and fine-tuned models from the{" "}
              <a href="https://huggingface.co/">Hugging Face</a> hub. Thanks to
              PyTorch's built-in functionality of{" "}
              <a
                href="https://pytorch.org/docs/stable/onnx.html"
                target="_blank"
              >
                exporting models to ONNX
              </a>{" "}
              and projects like{" "}
              <a
                href="https://huggingface.co/docs/optimum/index"
                target="_blank"
              >
                Optimum
              </a>{" "}
              and{" "}
              <a href="https://github.com/Ki6an/fastT5" target="_blank">
                fastT5
              </a>
              , it is straightforward to convert models and start using them on
              the web.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col l12">
            <h4>Demos</h4>
          </div>
        </div>
        <div className="row">
          <div className="col l12">
            <h5>Image processing</h5>
          </div>
        </div>
        <ImageDemos />
        <div className="row">
          <div className="col l12">
            <h5>Text processing</h5>
          </div>
        </div>
        <TextDemos />
      </div>
    </>
  );
};

export default Home;
