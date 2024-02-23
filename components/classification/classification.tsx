import Jimp from "jimp";
import { useLayoutEffect, useRef, useState } from "react";
import ExampleImages from "../exampleImages";
import { datadogLogs } from "@datadog/browser-logs";
import {
  ImageMetadata,
  ClassificationModel,
  ClassificationPrediction,
} from "@visheratin/web-ai/image";

interface ClassificationProps {
  models: ImageMetadata[];
}

const ClassificationComponent = (props: ClassificationProps) => {
  // create references for UI elements
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileSelectRef = useRef<HTMLInputElement>(null);
  const modelSelectRef = useRef<HTMLSelectElement>(null); // reference for the model selector element

  // create state store for canvas size properties
  const [displayDims, setDisplayDims] = useState({
    width: 0,
    height: 0,
    aspectRatio: 1,
  });

  const setImageSize = (aspectRatio: number = 1) => {
    if (imageContainerRef.current) {
      let canvasSize = imageContainerRef.current.offsetWidth - 11;
      canvasSize = canvasSize > 800 ? 800 : canvasSize;
      setDisplayDims({
        width: canvasSize,
        height: canvasSize * aspectRatio,
        aspectRatio: aspectRatio,
      });
    }
  };

  useLayoutEffect(() => {
    setImageSize();
  }, []);

  const [predictions, setPredictions] = useState({
    results: [] as ClassificationPrediction[],
  });

  const [model, setModel] = useState({
    instance: new ClassificationModel(props.models[0]),
  });

  const loadModel = async () => {
    setStatus({ processing: true });
    const selectedIdx = modelSelectRef.current?.selectedIndex as number;
    if (selectedIdx === 0) {
      return;
    }
    const metadata = props.models[selectedIdx - 1];
    const model = new ClassificationModel(metadata);
    const elapsed = await model.init();
    datadogLogs.logger.info("Model was created.", {
      demo: "classification",
      elapsed_seconds: elapsed,
    });
    setModel({ instance: model });
    setStatus({ processing: false });
  };

  const [status, setStatus] = useState({ processing: false });

  /**
   * selectFileImage sets the image data from the file select field
   */
  const selectFileImage = () => {
    if (
      fileSelectRef.current &&
      fileSelectRef.current.files &&
      fileSelectRef.current.files[0]
    ) {
      var reader = new FileReader();
      reader.onload = async () => {
        loadImage(reader.result);
      };
      reader.readAsArrayBuffer(fileSelectRef.current.files[0]);
    }
  };

  /**
   * loadImage reads the image data from the source, displays it on the canvas,
   * and sets the image data to the respective state.
   * @param src can be either URL or array buffer
   */
  const loadImage = async (src: any) => {
    setStatus({ processing: true });
    var imageBuffer = await Jimp.read(src);
    setImageSize(imageBuffer.bitmap.height / imageBuffer.bitmap.width);
    const imageData = new ImageData(
      new Uint8ClampedArray(imageBuffer.bitmap.data),
      imageBuffer.bitmap.width,
      imageBuffer.bitmap.height
    );
    let c = document.createElement("canvas");
    c.width = imageBuffer.bitmap.width;
    c.height = imageBuffer.bitmap.height;
    const ctx = c.getContext("2d");
    ctx!.putImageData(imageData, 0, 0);
    imageRef.current!.src = c.toDataURL("image/png");
    const result = await model.instance.process(src);
    datadogLogs.logger.info("Inference finished.", {
      demo: "classification",
      elapsed_seconds: result.elapsed,
      model: model.instance.metadata.title,
    });
    console.log(`Inference finished in ${result.elapsed} seconds.`);
    setPredictions({ results: result.results as ClassificationPrediction[] });
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
        <div className="col l6 m6 s12">
          <div
            ref={imageContainerRef}
            style={{ position: "relative", height: displayDims.height }}
          >
            <img
              ref={imageRef}
              width={displayDims.width}
              height={displayDims.height}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </div>
          {predictions.results && predictions.results.length > 0 && (
            <table className="centered">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {predictions.results.map((item, _) => {
                  return (
                    <tr>
                      <td>{item.class}</td>
                      <td>{Math.round(item.confidence * 10000) / 10000}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="col l6 m6 s12">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <h6>Select the image</h6>
            <div className="row">
              <div className="col l12 s12">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Select</span>
                    <input
                      ref={fileSelectRef}
                      type="file"
                      onChange={selectFileImage}
                      disabled={status.processing}
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input
                      className="file-path validate"
                      type="text"
                      placeholder="Select or drop a file"
                      disabled={status.processing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="divider"></div>
          <div>
            {model !== null &&
              model.instance !== null &&
              model.instance.metadata.examples &&
              model.instance.metadata.examples.length > 0 && (
                <ExampleImages
                  imageURLs={model.instance.metadata.examples}
                  setImageFunc={loadImage}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassificationComponent;
