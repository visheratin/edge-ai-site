import Jimp from "jimp";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tensor } from 'onnxruntime-web';
import { useSessionContext } from "../pages/sessionContext";
import ORTSession from "./session"
import * as ort from 'onnxruntime-web';

const SegmentationComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fileSelectRef = useRef<HTMLInputElement>(null);
  const fileURLRef = useRef<HTMLInputElement>(null);
  const [dims, setCanvasDims] = useState({ width: 0, height: 0, aspectRatio: 1 });
  const [session, _] = useSessionContext()

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

  useEffect(() => {
    window.addEventListener('resize', setCanvasSize);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, [setCanvasSize]);

  const process = () => {
    if (fileURLRef.current && fileURLRef.current.value !== '') {
      // https://i.imgur.com/CzXTtJV.jpg
      processImage(fileURLRef.current.value)
    }
    else if (fileSelectRef.current && fileSelectRef.current.files && fileSelectRef.current.files[0]) {
      processForm()
    }
  }

  const processForm = async () => {
    var reader = new FileReader();
    reader.onload = async function () {
      processImage(this.result)
    }
    reader.readAsArrayBuffer(fileSelectRef.current.files[0])
  }

  const processImage = async (src) => {
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
    let tensor = imageDataToTensor(imageData, [1, 3, 512, 512])
    await runInference(session, tensor)
  }

  function imageDataToTensor(image: Jimp, dims: number[]): Tensor {
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

  async function runInference(session: ort.InferenceSession, preprocessedData: any): Promise<[any, number]> {
    const start = new Date();
    const feeds: Record<string, ort.Tensor> = {};
    feeds[session.inputNames[0]] = preprocessedData;
    const outputData = await session.run(feeds);
    const end = new Date();
    const inferenceTime = (end.getTime() - start.getTime()) / 1000;
    const output = outputData[session.outputNames[0]];
    console.log(output, inferenceTime)
    outputToCanvas(output)
  }

  const outputToCanvas = async (output: Tensor) => {
    let i = 0
    // const size = dims.width * dims.height
    const size = 16384 * 4
    // const ratio = size / 16384
    const arrayBuffer = new ArrayBuffer(size);
    const pixels = new Uint8ClampedArray(arrayBuffer);
    let idx = 0
    // let ox, oy = 0
    // for (let y = 0; y < dims.height; y++) {
    //   for (let x = 0; x < dims.width; x++) {
    //     i = (y * dims.width + x) * 4
    //     ox = Math.floor(x / dims.width * 128)
    //     oy = Math.floor(y / dims.height * 128)
    //     idx = (oy * 128 + ox)
    //     if (output.data[idx] > output.data[idx + 16384] && output.data[idx] > output.data[idx + 32768]) {
    //       pixels[i] = 0;
    //       pixels[i + 1] = 0;
    //       pixels[i + 2] = 0;
    //       pixels[i + 3] = 0;
    //       continue
    //     }
    //     if (output.data[idx + 16384] > output.data[idx] && output.data[idx + 16384] > output.data[idx + 32768]) {
    //       pixels[i] = 163;
    //       pixels[i + 1] = 255;
    //       pixels[i + 2] = 0;
    //       pixels[i + 3] = 255;
    //       continue
    //     }
    //     if (output.data[idx + 32768] > output.data[idx + 16384] && output.data[idx + 32768] > output.data[idx + 16384]) {
    //       pixels[i] = 245;
    //       pixels[i + 1] = 0;
    //       pixels[i + 2] = 255;
    //       pixels[i + 3] = 255;
    //       continue
    //     }
    //   }
    // }
    let c = document.createElement("canvas")
    c.width = 128
    c.height = 128
    for (i = 0; i < size; i += 4) {
      idx = Math.floor(i / 4)
      if (output.data[idx] > output.data[idx + 16384] && output.data[idx] > output.data[idx + 32768]) {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
        pixels[i + 3] = 0;
        continue
      }
      if (output.data[idx + 16384] > output.data[idx] && output.data[idx + 16384] > output.data[idx + 32768]) {
        pixels[i] = 163;
        pixels[i + 1] = 255;
        pixels[i + 2] = 0;
        pixels[i + 3] = 100;
        continue
      }
      if (output.data[idx + 32768] > output.data[idx + 16384] && output.data[idx + 32768] > output.data[idx + 16384]) {
        pixels[i] = 245;
        pixels[i + 1] = 0;
        pixels[i + 2] = 255;
        pixels[i + 3] = 100;
        continue
      }
    }
    const imageData = new ImageData(pixels, 128, 128);
    const ctx = c.getContext('2d');
    ctx!.putImageData(imageData, 0, 0);
    const canvas = canvasRef.current;
    var destCtx = canvas!.getContext('2d');
    destCtx!.drawImage(c, 0, 0, c.width, c.height, 0, 0, canvas!.width, canvas!.height);
  }

  return (
    <>
      <ORTSession modelPath={"/_next/static/chunks/pages/model_quant.onnx"} />
      <div className="row">
        <div ref={canvasContainerRef} className="col l6 m6 s12">
          <canvas className="purple lighten-5" ref={canvasRef} width={dims.width} height={dims.height} />
        </div>
        <div className="col l6 m6 s12 center-align">
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
          <button className="btn waves-effect waves-light center-align" onClick={process}>Generate</button>
        </div>
      </div>
    </>
  )
}

export default SegmentationComponent