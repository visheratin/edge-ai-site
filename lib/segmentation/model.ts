import Config from "./config";
import { Metadata } from "./metadata";
import * as ort from "onnxruntime-web";
import { createSession } from "../session";
import Jimp from "jimp";
import { Tensor } from "../tensor";

type SegmentationResult = {
  data: ImageData;
  argmax: Tensor;
  elapsed: number;
};

export class SegmentationModel {
  metadata: Metadata;
  config: Config | null;
  session: ort.InferenceSession | null;

  constructor(metadata: Metadata, config: Config | null) {
    this.metadata = metadata;
    this.session = null;
    this.config = config;
  }

  init = async (logFunc: (elapsed: number) => void | null) => {
    this.session = await createSession(this.metadata.modelPath, logFunc);
    if (this.config === null) {
      this.config = new Config();
    }
    await this.config.initFromHub(
      this.metadata.configPath,
      this.metadata.preprocessorPath
    );
  };

  process = async (
    input: string | ArrayBuffer
  ): Promise<SegmentationResult> => {
    const image = await this.loadImage(input);
    const tensor = this.imageDataToTensor(image, [
      1,
      3,
      image.bitmap.width,
      image.bitmap.height,
    ]);
    const start = new Date();
    const output = await this.runInference(tensor);
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    const argmax = output.argmax(2);
    const size = argmax.ortTensor.dims[0] * argmax.ortTensor.dims[1] * 4;
    const arrayBuffer = new ArrayBuffer(size);
    const pixels = new Uint8ClampedArray(arrayBuffer);
    for (let i = 0; i < argmax.ortTensor.data.length; i++) {
      const idx = argmax.ortTensor.data[i];
      if (this.config && this.config.colors && this.config.colors.has(idx)) {
        const color = this.config.colors.get(idx);
        pixels[i] = color[0];
        pixels[i + 1] = color[1];
        pixels[i + 2] = color[2];
        pixels[i + 3] = 0;
      } else {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
        pixels[i + 3] = 0;
      }
    }
    let c = document.createElement("canvas");
    c.width = image.bitmap.width;
    c.height = image.bitmap.height;
    const imageData = new ImageData(
      pixels,
      argmax.ortTensor.dims[0],
      argmax.ortTensor.dims[1]
    );
    const ctx = c.getContext("2d");
    ctx!.putImageData(imageData, 0, 0, 0, 0, c.width, c.height);
    const result: SegmentationResult = {
      data: imageData,
      elapsed: elapsed,
      argmax: argmax,
    };
    return result;
  };

  loadImage = async (src: string | ArrayBuffer): Promise<Jimp> => {
    const data = await Jimp.read(src);
    const imageData = new ImageData(
      new Uint8ClampedArray(data.bitmap.data),
      data.bitmap.width,
      data.bitmap.height
    );
    let c = document.createElement("canvas");
    c.width = data.bitmap.width;
    c.height = data.bitmap.height;
    const ctx = c.getContext("2d");
    ctx!.putImageData(imageData, 0, 0);
    if (
      this.config &&
      this.config.preprocessor &&
      this.config.preprocessor.resize
    ) {
      return data.resize(
        this.config.preprocessor.size,
        this.config.preprocessor.size
      );
    }
    return data;
  };

  /**
   * imageDataToTensor converts Jimp image to ORT tensor
   * @param image instance of Jimp image
   * @param dims target dimensions of the tensor
   * @returns ORT tensor
   */
  imageDataToTensor = (image: Jimp, dims: number[]): ort.Tensor => {
    var imageBufferData = image.bitmap.data;
    const [redArray, greenArray, blueArray] = new Array(
      new Array<number>(),
      new Array<number>(),
      new Array<number>()
    );
    for (let i = 0; i < imageBufferData.length; i += 4) {
      if (
        this.config &&
        this.config.preprocessor &&
        this.config.preprocessor.normalize.enabled &&
        this.config.preprocessor.normalize.mean &&
        this.config.preprocessor.normalize.std
      ) {
        let value =
          (imageBufferData[i] / 255.0 -
            this.config.preprocessor.normalize.mean[0]) /
          this.config.preprocessor.normalize.std[0];
        redArray.push(value);
        value =
          (imageBufferData[i + 1] / 255.0 -
            this.config.preprocessor.normalize.mean[1]) /
          this.config.preprocessor.normalize.std[1];
        greenArray.push(value);
        value =
          (imageBufferData[i + 2] / 255.0 -
            this.config.preprocessor.normalize.mean[2]) /
          this.config.preprocessor.normalize.std[2];
        blueArray.push(value);
      } else {
        let value = imageBufferData[i] / 255.0;
        redArray.push(value);
        value = imageBufferData[i + 1] / 255.0;
        greenArray.push(value);
        value = imageBufferData[i + 2] / 255.0;
        blueArray.push(value);
      }
    }
    const transposedData = redArray.concat(greenArray).concat(blueArray);
    const l = transposedData.length;
    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
    for (let i = 0; i < l; i++) {
      float32Data[i] = transposedData[i];
    }
    const inputTensor = new ort.Tensor("float32", float32Data, dims);
    return inputTensor;
  };

  runInference = async (input: ort.Tensor): Promise<Tensor> => {
    const feeds: Record<string, ort.Tensor> = {};
    feeds[this.session.inputNames[0]] = input;
    const outputData = await this.session.run(feeds);
    const output = outputData[this.session.outputNames[0]];
    return new Tensor(output);
  };
}
