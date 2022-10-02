import Jimp from "jimp";
import { useLayoutEffect, useRef, useState } from "react";
import { Tensor } from 'onnxruntime-web';
import { useSessionContext } from "../sessionContext";
import * as ort from 'onnxruntime-web';
import SelectModel from "../selectModel";
import ColorSchema from "./colorSchema";
import ExampleImages from "./exampleImages";
import { ModelMetadata } from "../../data/modelMeta";
import { datadogLogs } from "@datadog/browser-logs";

interface SegmentationProps {
  models: ModelMetadata[]
}

const SegmentationComponent = (props: SegmentationProps) => {
  // create references for UI elements
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const fileSelectRef = useRef<HTMLInputElement>(null)
  const fileURLRef = useRef<HTMLInputElement>(null)

  // create state store for canvas size properties
  const [displayDims, setDisplayDims] = useState({ width: 0, height: 0, aspectRatio: 1 })

  // create session context that stores loaded inference sessions
  const [sessionInfo, _] = useSessionContext()

  // Create state for the image data. We need to have such state because 
  // the image data is set separately via URL, form file, or sample image.
  // We set the state from these sources and use it in the processing method.
  const [imageData, setImageData] = useState({ data: null })

  const [foundClassIdx, setFoundClassIdx] = useState({ indices: new Set<number>() })

  const [className, setClassName] = useState({ value: "none" })

  /**
   * setCanvasSize sets the size of the canvas based on the screen size.
   * @param aspectRatio ratio between height and widht of the image
   */
  const setCanvasSize = (aspectRatio: number = 1) => {
    if (canvasRef.current && canvasContainerRef.current) {
      let canvasSize = canvasContainerRef.current.offsetWidth - 11
      canvasSize = canvasSize > 800 ? 800 : canvasSize
      setDisplayDims({
        width: canvasSize,
        height: canvasSize * aspectRatio,
        aspectRatio: aspectRatio
      });
    }
  }

  // set canvas size when the component is loaded
  useLayoutEffect(() => {
    setCanvasSize()
  }, []);

  /**
   * selectURLImage sets the image data from the URL text input field
   */
  const selectURLImage = () => {
    if (fileURLRef.current && fileURLRef.current.value !== '') {
      loadImage(fileURLRef.current.value)
    }
  }

  /**
   * selectFileImage sets the image data from the file select field
   */
  const selectFileImage = () => {
    if (fileSelectRef.current && fileSelectRef.current.files && fileSelectRef.current.files[0]) {
      var reader = new FileReader();
      reader.onload = async () => {
        loadImage(reader.result)
      }
      reader.readAsArrayBuffer(fileSelectRef.current.files[0])
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
  }

  const getClass = (e) => {
    const canvas = canvasRef.current;
    var rect = canvas!.getBoundingClientRect();
    const ctx = canvas!.getContext('2d');
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    var c = ctx!.getImageData(x, y, 1, 1).data;
    let className = ""
    let minDiff = Infinity
    let diff = 0
    for (let cls of sessionInfo.meta.classes) {
      diff = Math.abs(cls.color[0] - c[0]) + Math.abs(cls.color[1] - c[1]) + Math.abs(cls.color[2] - c[2]) + Math.abs(cls.color[3] - c[3])
      if (diff < minDiff) {
        minDiff = diff
        className = cls.name
      }
    }
    setClassName({ value: className })
  }

  /**
   * loadImage reads the image data from the source, displays it on the canvas, 
   * and sets the image data to the respective state.
   * @param src can be either URL or array buffer
   */
  const loadImage = async (src: any) => {
    clearCanvas()
    var imgData = await Jimp.read(src).then((imageBuffer: Jimp) => {
      setCanvasSize(imageBuffer.bitmap.height / imageBuffer.bitmap.width)
      const imageData = new ImageData(new Uint8ClampedArray(imageBuffer.bitmap.data), imageBuffer.bitmap.width, imageBuffer.bitmap.height);
      let c = document.createElement("canvas")
      c.width = imageBuffer.bitmap.width
      c.height = imageBuffer.bitmap.height
      const ctx = c.getContext('2d');
      ctx!.putImageData(imageData, 0, 0);
      imageRef.current.src = c.toDataURL("image/png")
      return imageBuffer.resize(512, 512);
    });
    setImageData({ data: imgData })
  }

  const processImage = async () => {
    clearCanvas()
    const tensor = imageDataToTensor(imageData.data, [1, 3, 512, 512])
    if (sessionInfo.sessions.has("segment-model")) {
      runInference(tensor)
    }
  }

  /**
   * imageDataToTensor converts Jimp image to ORT tensor
   * @param image instance of Jimp image
   * @param dims target dimensions of the tensor
   * @returns ORT tensor
   */
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

  const runInference = async (tensor: Tensor) => {
    const session = sessionInfo.sessions.get("segment-model")
    const start = new Date();
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session.inputNames[0]] = tensor;
    const outputData = await session.run(feeds);
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    const output = outputData[session.outputNames[0]];
    datadogLogs.logger.info('Inference finished.', {
      elapsed_seconds: elapsed,
    })
    console.log(`Inference time: ${elapsed} seconds.`)
    drawOnCanvas(output)
  }

  /**
   * drawOnCanvas projects the result of running the inference onto the canvas.
   * @param tensor output tensor from running the inference
   */
  const drawOnCanvas = async (tensor: Tensor) => {
    let i = 0
    const size = 128 * 128 * 4
    const arrayBuffer = new ArrayBuffer(size);
    const pixels = new Uint8ClampedArray(arrayBuffer);
    let idx = 0
    let c = document.createElement("canvas")
    c.width = 128
    c.height = 128
    const argMaxArray = outputArgMax(tensor)
    for (i = 0; i < size; i += 4) {
      idx = Math.round(i / 4)
      const color = argMaxArray[idx]
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

  /**
   * outputArgMax calculates argmax for every value in the resulting tensor and assigns
   * the color value to it according to the color schema of the model.
   * @param tensor 
   * @returns 
   */
  const outputArgMax = (tensor: Tensor): number[][] => {
    const modelClasses = sessionInfo.meta.classes
    let result: number[][] = []
    const size = 128 * 128
    let classNumbers = new Set<number>()
    for (let idx = 0; idx < size; idx++) {
      let maxIdx = 0
      let maxValue = -1000
      for (let i = 0; i < modelClasses.length; i++) {
        if (tensor.data[idx + i * size] > maxValue) {
          maxValue = tensor.data[idx + i * size]
          maxIdx = i
        }
      }
      classNumbers.add(maxIdx)
      result.push(modelClasses[maxIdx].color)
    }
    setFoundClassIdx({ indices: classNumbers })
    return result
  }

  return (
    <>
      <SelectModel models={props.models} callback={() => { }} />
      <div className="row">
        <div className="col l6 m6 s12" >
          <div ref={canvasContainerRef} style={{ position: "relative", height: displayDims.height }}>
            <img ref={imageRef} width={displayDims.width} height={displayDims.height} style={{ position: "absolute", top: 0, left: 0 }} />
            <canvas
              ref={canvasRef}
              width={displayDims.width}
              height={displayDims.height}
              style={{ position: "absolute", top: 0, left: 0 }}
              onClick={getClass}
              onTouchEnd={getClass} />
          </div>
          <h6 className="center-align">Selected class: {className.value}</h6>
          <div className="divider"></div>
          <div>
            {
              sessionInfo !== null && <ColorSchema classes={sessionInfo.meta.classes} foundIndices={foundClassIdx.indices} />
            }
          </div>
        </div>
        <div className="col l6 m6 s12">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <h6>Set the data from URL</h6>
            <div className="row">
              <div className="col l10 s12">
                <div className="input-field">
                  <input ref={fileURLRef} placeholder="Paste image link" type="text" className="validate" />
                </div>
              </div>
              <div className="col l2 s12">
                <div className="input-field">
                  <button
                    className="btn col s12 waves-effect waves-light"
                    onClick={selectURLImage}
                    style={{
                      marginTop: "5px"
                    }}>
                    Set
                  </button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <h6>Set the data from local file</h6>
            <div className="row">
              <div className="col l10 s12">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Select</span>
                    <input ref={fileSelectRef} type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Select or drop a file" />
                  </div>
                </div>
              </div>
              <div className="col l2 s12">
                <div className="input-field">
                  <button
                    className="btn col s12 waves-effect waves-light"
                    onClick={selectFileImage}
                    style={{
                      marginTop: "5px"
                    }}>
                    Set
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col l12 m12 s12">
              <div className="divider"></div>
              <button
                className="btn col l6 m6 s12 waves-effect waves-light"
                disabled={imageData.data === null || sessionInfo === null}
                onClick={processImage}
                style={{
                  marginTop: "10px"
                }}>
                Generate segments
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="col l12 m12 s12">
            {
              sessionInfo !== null && <ExampleImages imageURLs={sessionInfo.meta.examples} setImageFunc={loadImage} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SegmentationComponent