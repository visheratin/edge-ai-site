import Config from "./config";
import { Metadata } from "./metadata";
import * as ort from "onnxruntime-web";
import { createSession } from "../session";
import Jimp from "jimp";
import { Tensor } from "../tensor";

type SegmentationResult = {
  data: HTMLCanvasElement;
  elapsed: number;
};

export class SegmentationModel {
  private metadata: Metadata;
  private config: Config | null;
  private session: ort.InferenceSession | null;

  constructor(metadata: Metadata, config: Config | null) {
    this.metadata = metadata;
    this.session = null;
    this.config = config;
  }

  init = async (): Promise<number> => {
    const start = new Date();
    this.session = await createSession(this.metadata.modelPath);
    if (this.config === null) {
      this.config = new Config();
      await this.config.initFromHub(
        this.metadata.configPath,
        this.metadata.preprocessorPath
      );
    }
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    return elapsed;
  };

  process = async (
    input: string | ArrayBuffer
  ): Promise<SegmentationResult> => {
    let image = await Jimp.read(input);
    if (
      this.config &&
      this.config.preprocessor &&
      this.config.preprocessor.resize
    ) {
      image = image.resize(
        this.config.preprocessor.size,
        this.config.preprocessor.size
      );
    }
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
    const argmax = this.argmaxColors(output.ortTensor);
    const size = output.ortTensor.dims[2] * output.ortTensor.dims[3] * 4;
    const arrayBuffer = new ArrayBuffer(size);
    const pixels = new Uint8ClampedArray(arrayBuffer);
    for (let i = 0; i < size; i += 4) {
      const color = argmax[i / 4];
      pixels[i] = color[0];
      pixels[i + 1] = color[1];
      pixels[i + 2] = color[2];
      pixels[i + 3] = 120;
    }
    const imageData = new ImageData(
      pixels,
      output.ortTensor.dims[2],
      output.ortTensor.dims[3]
    );
    let resCanvas = document.createElement("canvas");
    resCanvas.width = imageData.width;
    resCanvas.height = imageData.height;
    resCanvas.getContext("2d").putImageData(imageData, 0, 0);
    const result: SegmentationResult = {
      data: resCanvas,
      elapsed: elapsed,
    };
    return result;
  };

  getClass = (inputColor: Uint8ClampedArray | number[]): string => {
    let className = "";
    let minDiff = Infinity;
    let diff = 0;
    for (let [idx, color] of this.config?.colors) {
      diff =
        Math.abs(color[0] - inputColor[0]) +
        Math.abs(color[1] - inputColor[1]) +
        Math.abs(color[2] - inputColor[2]);
      if (diff < minDiff) {
        minDiff = diff;
        className = this.config?.classes.get(idx);
      }
    }
    return className;
  };

  private argmaxColors = (tensor: ort.Tensor): number[][] => {
    const modelClasses = this.config?.colors;
    let result: number[][] = [];
    const size = 128 * 128;
    let classNumbers = new Set<number>();
    for (let idx = 0; idx < size; idx++) {
      let maxIdx = 0;
      let maxValue = -1000;
      for (let i = 0; i < modelClasses.size; i++) {
        if (tensor.data[idx + i * size] > maxValue) {
          maxValue = tensor.data[idx + i * size];
          maxIdx = i;
        }
      }
      classNumbers.add(maxIdx);
      result.push(modelClasses?.get(maxIdx));
    }
    return result;
  };

  /**
   * imageDataToTensor converts Jimp image to ORT tensor
   * @param image instance of Jimp image
   * @param dims target dimensions of the tensor
   * @returns ORT tensor
   */
  private imageDataToTensor = (image: Jimp, dims: number[]): ort.Tensor => {
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

  private runInference = async (input: ort.Tensor): Promise<Tensor> => {
    const feeds: Record<string, ort.Tensor> = {};
    feeds[this.session!.inputNames[0]] = input;
    const outputData = await this.session.run(feeds);
    const output = outputData[this.session.outputNames[0]];
    return new Tensor(output);
  };
}
