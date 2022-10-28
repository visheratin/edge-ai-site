import { Config, PreprocessorConfig } from "./config";

test("parse preprocessor config", () => {
  const data = {
    do_normalize: true,
    do_resize: true,
    feature_extractor_type: "SegformerFeatureExtractor",
    image_mean: [0.485, 0.456, 0.406],
    image_std: [0.229, 0.224, 0.225],
    reduce_labels: true,
    resample: 2,
    size: 512,
  };
  let expected = {
    normalize: {
      enabled: true,
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225],
    },
    resize: true,
    size: 512,
  };
  let config = new PreprocessorConfig();
  config.parseConfig(data);
  expect(config.normalize).toEqual(expected.normalize);
  expect(config.resize).toEqual(expected.resize);
  expect(config.size).toEqual(expected.size);
});

test("parse config", () => {
  const data = {
    architectures: ["SegformerForSemanticSegmentation"],
    attention_probs_dropout_prob: 0.0,
    classifier_dropout_prob: 0.1,
    decoder_hidden_size: 256,
    depths: [2, 2, 2, 2],
    downsampling_rates: [1, 4, 8, 16],
    drop_path_rate: 0.1,
    hidden_act: "gelu",
    hidden_dropout_prob: 0.0,
    hidden_sizes: [32, 64, 160, 256],
    id2label: {
      "0": "road",
      "1": "sidewalk",
      "2": "building",
      "3": "wall",
      "4": "fence",
      "5": "pole",
      "6": "traffic light",
      "7": "traffic sign",
      "8": "vegetation",
      "9": "terrain",
      "10": "sky",
      "11": "person",
      "12": "rider",
      "13": "car",
      "14": "truck",
      "15": "bus",
      "16": "train",
      "17": "motorcycle",
      "18": "bicycle",
    },
    image_size: 224,
    initializer_range: 0.02,
    label2id: {
      bicycle: 18,
      building: 2,
      bus: 15,
      car: 13,
      fence: 4,
      motorcycle: 17,
      person: 11,
      pole: 5,
      rider: 12,
      road: 0,
      sidewalk: 1,
      sky: 10,
      terrain: 9,
      "traffic light": 6,
      "traffic sign": 7,
      train: 16,
      truck: 14,
      vegetation: 8,
      wall: 3,
    },
    layer_norm_eps: 1e-6,
    mlp_ratios: [4, 4, 4, 4],
    model_type: "segformer",
    num_attention_heads: [1, 2, 5, 8],
    num_channels: 3,
    num_encoder_blocks: 4,
    patch_sizes: [7, 3, 3, 3],
    reshape_last_stage: true,
    sr_ratios: [8, 4, 2, 1],
    strides: [4, 2, 2, 2],
    torch_dtype: "float32",
    transformers_version: "4.12.0.dev0",
  };
  let expected = {
    classes: new Map<number, string>([
      [0, "road"],
      [1, "sidewalk"],
      [2, "building"],
      [3, "wall"],
      [4, "fence"],
      [5, "pole"],
      [6, "traffic light"],
      [7, "traffic sign"],
      [8, "vegetation"],
      [9, "terrain"],
      [10, "sky"],
      [11, "person"],
      [12, "rider"],
      [13, "car"],
      [14, "truck"],
      [15, "bus"],
      [16, "train"],
      [17, "motorcycle"],
      [18, "bicycle"],
    ]),
  };
  let config = new Config();
  config.parseConfig(data);
  expect(config.classes).toEqual(expected.classes);
});

export {};
