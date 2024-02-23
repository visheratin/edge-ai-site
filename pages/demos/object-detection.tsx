import type { NextPage } from "next";
import Head from "next/head";
import ObjectDetectionComponent from "../../components/objectDetection/objectDetection";
import { ModelType, ListImageModels } from "@visheratin/web-ai/image";

const SEMSegmentation: NextPage = () => {
  const models = ListImageModels(undefined, ModelType.ObjectDetection);
  return (
    <>
      <Head>
        <title>Object detection - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Object detection</h2>
          <div className="col s12">
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
          <ObjectDetectionComponent models={models} />
        </div>
      </div>
    </>
  );
};

export default SEMSegmentation;
