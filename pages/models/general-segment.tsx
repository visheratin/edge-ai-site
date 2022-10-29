import type { NextPage } from "next";
import Head from "next/head";
import { generalSegmentationModels } from "../../components/segmentation/models";
import SegmentationComponent from "../../components/segmentation/newSegmentation";
import { ORTSessionProvider } from "../../components/sessionContext";

const SEMSegmentation: NextPage = () => {
  return (
    <ORTSessionProvider>
      <Head>
        <title>Semantic images segmentation - Edge AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Semantic images segmentation</h2>
          <div className="col s12">
            <h6>About the demo</h6>
            <p></p>
            <h6>How to use the demo:</h6>
            <ol>
              <li>Select the model and load it.</li>
              <li>
                Load the image from the device, or select one of example images.
              </li>
              <li>Generate segments.</li>
              <li>
                You can click on the image to see the class of the object.
              </li>
            </ol>
          </div>
        </div>
        <div className="row">
          <SegmentationComponent models={generalSegmentationModels} />
        </div>
      </div>
    </ORTSessionProvider>
  );
};

export default SEMSegmentation;
