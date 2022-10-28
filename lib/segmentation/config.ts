export class Config {
  classes: Map<number, string>;
  colors: Map<number, number[]>;
  preprocessor: PreprocessorConfig | null;

  constructor() {
    this.classes = new Map<number, string>();
    this.colors = new Map<number, number[]>();
    this.preprocessor = null;
  }

  initFromHub = async (configPath: string, preprocessorPath: string) => {
    const configData = await fetch(configPath).then((resp) => resp.json());
    this.parseConfig(configData);
    this.preprocessor = new PreprocessorConfig();
    await this.preprocessor.initFromHub(preprocessorPath);
    this.validate();
  };

  parseConfig = (configData) => {
    for (const [idxString, className] of Object.entries(
      configData["id2label"]
    )) {
      const idx = Number(idxString);
      this.classes.set(idx, className);
      const hexColor = Math.floor(Math.random() * 16777215).toString(16);
      const color = this.convertToRGB(hexColor);
      this.colors.set(idx, color);
    }
  };

  validate = () => {
    if (this.colors && this.classes && this.classes.size != this.colors.size) {
      throw new Error("lengths of classes and colors do not match");
    }
    this.classes.forEach(
      (value: string, key: number, _: Map<number, string>) => {
        if (this.colors && !this.colors.has(key)) {
          throw new Error(
            `class ${value} (code ${key}) is not present in colors`
          );
        }
      }
    );
    if (
      this.preprocessor &&
      this.preprocessor.normalize &&
      this.preprocessor.normalize.enabled
    ) {
      if (
        this.preprocessor.normalize.mean &&
        this.preprocessor.normalize.mean.length != 3
      ) {
        throw new Error("normalization mean array must have a size of 3");
      }
      if (
        this.preprocessor.normalize.std &&
        this.preprocessor.normalize.std.length != 3
      ) {
        throw new Error("normalization std array must have a size of 3");
      }
    }
  };

  convertToRGB = (hexColor: string): number[] => {
    hexColor = hexColor.replace("#", "");
    const rgbValue = hexColor.match(/.{1,2}/g);
    if (rgbValue === null || rgbValue.length != 3) {
      throw new Error("invalid hex color");
    }
    const result = [
      parseInt(rgbValue[0], 16),
      parseInt(rgbValue[1], 16),
      parseInt(rgbValue[2], 16),
    ];
    return result;
  };
}

export type NormalizeConfig = {
  enabled: boolean;
  mean?: number[];
  std?: number[];
};

export class PreprocessorConfig {
  normalize: NormalizeConfig;
  resize: boolean;
  size: number;

  constructor() {}

  initFromHub = async (configPath: string) => {
    const configData = await fetch(configPath).then((resp) => resp.json());
    this.parseConfig(configData);
  };

  parseConfig = (configData) => {
    this.normalize = {
      enabled: configData["do_normalize"],
      mean: configData["image_mean"],
      std: configData["image_std"],
    };
    this.resize = configData["do_resize"];
    this.size = configData["size"];
  };
}
