import type { NextPage } from "next";
import SegmentationComponent from "../../components/segmentation/segmentation";
import Head from "next/head";
import { semSegmentationModels } from "../../components/segmentation/models";

const SEMSegmentation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Microscopy images segmentation - Edge AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Microscopy images segmentation</h2>
          <div className="col s12">
            <h6>About the demo</h6>
            <p>
              Scanning electron microscope (SEM) analysis is a powerful tool
              that is widely used in materials science, biology, and medicine to
              perform a detailed examination of objects on extremely small
              scales. In nanoscience, this technique is among a very few methods
              that allow understanding of the shape of synthesized particles.
              And particle shape is an integral characteristic for chiral
              nanomaterials where left-handed (twisted to the left) and
              right-handed (twisted to the right) particles usually have
              opposite properties.
            </p>
            <p>
              In collaboration with{" "}
              <a
                href="https://www.linkedin.com/in/avisheratina/"
                target="_blank"
              >
                Dr. Anastasia Visheratina
              </a>{" "}
              and{" "}
              <a
                href="https://kotov.engin.umich.edu/professor/"
                target="_blank"
              >
                Prof. Nicholas Kotov
              </a>
              , we developed an algorithm for synthetic data generation that
              allows to use 15-20 original images to create thousands of images
              for training. We used this approach to train a variety of{" "}
              <a href="https://arxiv.org/abs/2105.15203" target="_blank">
                SegFormer
              </a>{" "}
              models to perform a semantic segmentation of left-handed and
              right-handed nanoparticles. As a result, we got 94-97% mIoU on the
              validation dataset depending on the model size. Intrestingly, all
              trained models demonstrate generalizability - althouth they were
              trained on only one kind of particles, they can detect other
              particles that are twisted.
            </p>
            <p>
              In this demo, you can check out three trained models - B0 (3.8M
              parameters), B1 (13.7M parameters), and B5 (84.7M parameters). All
              models were exported to ONNX using standard PyTorch functionality.
            </p>
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
          <SegmentationComponent models={semSegmentationModels} />
        </div>
      </div>
    </>
  );
};

export default SEMSegmentation;
