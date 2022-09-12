import Jimp from "jimp";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tensor } from 'onnxruntime-web';
import { useSessionContext } from "../sessionContext";
import * as ort from 'onnxruntime-web';
import { segmentationModels } from "../../data/segmentation";
import SelectModel from "../selectModel";
import ColorSchema from "./colorSchema";
import ExampleImages from "./exampleImages";

const SegmentationComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const fileSelectRef = useRef<HTMLInputElement>(null)
  const fileURLRef = useRef<HTMLInputElement>(null)
  const [dims, setCanvasDims] = useState({ width: 0, height: 0, aspectRatio: 1 })
  const [sessionInfo, _] = useSessionContext()
  const [imageData, setImageData] = useState({ data: null })

  const setCanvasSize = (aspectRatio: number = 1) => {
    if (canvasRef.current && canvasContainerRef.current) {
      let canvasSize = canvasContainerRef.current.offsetWidth - 11
      canvasSize = canvasSize > 800 ? 800 : canvasSize
      setCanvasDims({
        width: canvasSize,
        height: canvasSize * aspectRatio,
        aspectRatio: aspectRatio
      });
    }
  }

  useLayoutEffect(() => {
    setCanvasSize()
  }, []);

  // useEffect(() => {
  //   window.addEventListener('resize', setCanvasSize);
  //   return () => window.removeEventListener('resize', setCanvasSize);
  // }, [setCanvasSize]);

  const process = () => {
    if (fileURLRef.current && fileURLRef.current.value !== '') {
      loadImage(fileURLRef.current.value)
    }
    else if (fileSelectRef.current && fileSelectRef.current.files && fileSelectRef.current.files[0]) {
      var reader = new FileReader();
      reader.onload = async function () {
        loadImage(this.result)
      }
      reader.readAsArrayBuffer(fileSelectRef.current.files[0])
    }
  }

  const loadImage = async (src: any) => {
    var imageData = await Jimp.read(src).then((imageBuffer: Jimp) => {
      setCanvasSize(imageBuffer.bitmap.height / imageBuffer.bitmap.width)
      const imageData = new ImageData(new Uint8ClampedArray(imageBuffer.bitmap.data), imageBuffer.bitmap.width, imageBuffer.bitmap.height);
      let c = document.createElement("canvas")
      c.width = imageBuffer.bitmap.width
      c.height = imageBuffer.bitmap.height
      const ctx = c.getContext('2d');
      ctx!.putImageData(imageData, 0, 0);
      const canvas = canvasRef.current;
      var destCtx = canvas!.getContext('2d');
      destCtx!.drawImage(c, 0, 0, c.width, c.height, 0, 0, canvas!.width, canvas!.height);
      return imageBuffer.resize(512, 512);
    });
    setImageData({ data: imageData })
  }

  const processImage = () => {
    const tensor = imageDataToTensor(imageData.data, [1, 3, 512, 512])
    runInference(sessionInfo.session, tensor)
  }

  const imageDataToTensor = (image: Jimp, dims: number[]): Tensor => {
    var imageBufferData = image.bitmap.data;
    const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());
    for (let i = 0; i < imageBufferData.length; i += 4) {
      redArray.push((imageBufferData[i] / 255.0 - 0.485) / 0.229);
      greenArray.push((imageBufferData[i + 1] / 255.0 - 0.456) / 0.224);
      blueArray.push((imageBufferData[i + 2] / 255.0 - 0.406) / 0.225);
    }
    const transposedData = redArray.concat(greenArray).concat(blueArray);
    let i, l = transposedData.length;
    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
    for (i = 0; i < l; i++) {
      float32Data[i] = transposedData[i]
    }
    const inputTensor = new Tensor("float32", float32Data, dims);
    return inputTensor;
  }

  const runInference = async (session: ort.InferenceSession, tensor: any) => {
    const start = new Date();
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session.inputNames[0]] = tensor;
    const outputData = await session.run(feeds);
    const end = new Date();
    const inferenceTime = (end.getTime() - start.getTime()) / 1000;
    const output = outputData[session.outputNames[0]];
    console.log(inferenceTime)
    outputToCanvas(output)
  }

  const outputToCanvas = async (output: Tensor) => {
    let i = 0
    const size = 128 * 128 * 4
    const arrayBuffer = new ArrayBuffer(size);
    const pixels = new Uint8ClampedArray(arrayBuffer);
    let idx = 0
    let c = document.createElement("canvas")
    c.width = 128
    c.height = 128
    for (i = 0; i < size; i += 4) {
      idx = Math.floor(i / 4)
      const color = pixelArgMax(output, idx)
      pixels[i] = color[0];
      pixels[i + 1] = color[1];
      pixels[i + 2] = color[2];
      pixels[i + 3] = color[3];
    }
    const imageData = new ImageData(pixels, 128, 128);
    const ctx = c.getContext('2d');
    ctx!.putImageData(imageData, 0, 0);
    const canvas = canvasRef.current;
    var destCtx = canvas!.getContext('2d');
    destCtx!.drawImage(c, 0, 0, c.width, c.height, 0, 0, canvas!.width, canvas!.height);
  }

  const pixelArgMax = (tensor: Tensor, idx: number): number[] => {
    const classes = sessionInfo.meta.classes
    let maxIdx = 0
    let maxValue = -1000
    const size = 16384
    for (let i = 0; i < classes.length; i++) {
      if (tensor.data[idx + i * size] > maxValue) {
        maxValue = tensor.data[idx + i * size]
        maxIdx = i
      }
    }
    return classes[maxIdx].color
  }

  return (
    <>
      <SelectModel models={segmentationModels} />
      <div className="row">
        <div ref={canvasContainerRef} className="col l6 m6 s12">
          <canvas className="purple lighten-5" ref={canvasRef} width={dims.width} height={dims.height} />
        </div>
        <div className="col l6 m6 s12 center-align">
          <div className="row">
            <div className="col s12">
              <h6 className="left-align">Select the data</h6>
              <form action="#">
                <div className="input-field">
                  <input ref={fileURLRef} placeholder="Paste image link" type="text" className="validate" />
                </div>
                <div>OR</div>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>File</span>
                    <input ref={fileSelectRef} type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Select a file" />
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col l6 m6 s12">
                  <button
                    className="btn col s12 waves-effect waves-light"
                    onClick={process}
                    style={{
                      marginTop: "5px"
                    }}>
                    Set
                  </button>
                </div>
                <div className="col l6 m6 s12">
                  <button
                    className="btn col s12 waves-effect waves-light"
                    disabled={imageData.data === null || sessionInfo === null}
                    onClick={processImage}
                    style={{
                      marginTop: "5px"
                    }}>
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {
                sessionInfo !== null && <ColorSchema classes={sessionInfo.meta.classes} />
              }
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {
                sessionInfo !== null && <ExampleImages imageURLs={sessionInfo.meta.examples} setImageFunc={loadImage} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SegmentationComponent