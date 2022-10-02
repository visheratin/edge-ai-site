import { Metadata, ModelClass } from "./metadata";

const semSegmentationClasses: ModelClass[] = [
    {
        name: "Background",
        color: [0, 0, 0, 0]
    },
    {
        name: "Right-handed particles",
        color: [163, 255, 0, 100]
    },
    {
        name: "Left-handed particles",
        color: [245, 0, 255, 100]
    }
]

const semSegmentationExamples: string[] = [
    "/sem-segment/image-1.png",
    "/sem-segment/image-2.png",
    "/sem-segment/image-3.png"
]

export const semSegmentationModels: Metadata[] = [
    {
        title: "Small model (SegFormer B0, 4 MB)",
        models: new Map<string, string>([
            ["segment-model", "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b0.onnx"],
        ]),
        classes: semSegmentationClasses,
        examples: semSegmentationExamples
    },
    {
        title: "Larger model (SegFormer B1, 14 MB)",
        models: new Map<string, string>([
            ["segment-model", "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b1.onnx"],
        ]),
        classes: semSegmentationClasses,
        examples: semSegmentationExamples
    },
    {
        title: "Large model (SegFormer B5, 85 MB)",
        models: new Map<string, string>([
            ["segment-model", "https://edge-ai-models.s3.us-east-2.amazonaws.com/sem-segment/b5.onnx"],
        ]),
        classes: semSegmentationClasses,
        examples: semSegmentationExamples
    }
]

const generalSegmentationClasses: ModelClass[] = [
    { name: "wall", color: [120, 120, 120, 150] },
    { name: "building", color: [180, 120, 120, 150] },
    { name: "sky", color: [6, 230, 230, 150] },
    { name: "floor", color: [80, 50, 50, 150] },
    { name: "tree", color: [4, 200, 3, 150] },
    { name: "ceiling", color: [120, 120, 80, 150] },
    { name: "road", color: [140, 140, 140, 150] },
    { name: "bed", color: [204, 5, 255, 150] },
    { name: "windowpane", color: [230, 230, 230, 150] },
    { name: "grass", color: [4, 250, 7, 150] },
    { name: "cabinet", color: [224, 5, 255, 150] },
    { name: "sidewalk", color: [235, 255, 7, 150] },
    { name: "person", color: [150, 5, 61, 150] },
    { name: "earth", color: [120, 120, 70, 150] },
    { name: "door", color: [8, 255, 51, 150] },
    { name: "table", color: [255, 6, 82, 150] },
    { name: "mountain", color: [143, 255, 140, 150] },
    { name: "plant", color: [204, 255, 4, 150] },
    { name: "curtain", color: [255, 51, 7, 150] },
    { name: "chair", color: [204, 70, 3, 150] },
    { name: "car", color: [0, 102, 200, 150] },
    { name: "water", color: [61, 230, 250, 150] },
    { name: "painting", color: [255, 6, 51, 150] },
    { name: "sofa", color: [11, 102, 255, 150] },
    { name: "shelf", color: [255, 7, 71, 150] },
    { name: "house", color: [255, 9, 224, 150] },
    { name: "sea", color: [9, 7, 230, 150] },
    { name: "mirror", color: [220, 220, 220, 150] },
    { name: "rug", color: [255, 9, 92, 150] },
    { name: "field", color: [112, 9, 255, 150] },
    { name: "armchair", color: [8, 255, 214, 150] },
    { name: "seat", color: [7, 255, 224, 150] },
    { name: "fence", color: [255, 184, 6, 150] },
    { name: "desk", color: [10, 255, 71, 150] },
    { name: "rock", color: [255, 41, 10, 150] },
    { name: "wardrobe", color: [7, 255, 255, 150] },
    { name: "lamp", color: [224, 255, 8, 150] },
    { name: "bathtub", color: [102, 8, 255, 150] },
    { name: "railing", color: [255, 61, 6, 150] },
    { name: "cushion", color: [255, 194, 7, 150] },
    { name: "base", color: [255, 122, 8, 150] },
    { name: "box", color: [0, 255, 20, 150] },
    { name: "column", color: [255, 8, 41, 150] },
    { name: "signboard", color: [255, 5, 153, 150] },
    { name: "chest of drawers", color: [6, 51, 255, 100] },
    { name: "counter", color: [235, 12, 255, 150] },
    { name: "sand", color: [160, 150, 20, 150] },
    { name: "sink", color: [0, 163, 255, 150] },
    { name: "skyscraper", color: [140, 140, 140, 150] },
    { name: "fireplace", color: [250, 10, 15, 150] },
    { name: "refrigerator", color: [20, 255, 0, 150] },
    { name: "grandstand", color: [31, 255, 0, 150] },
    { name: "path", color: [255, 31, 0, 150] },
    { name: "stairs", color: [255, 224, 0, 150] },
    { name: "runway", color: [153, 255, 0, 150] },
    { name: "case", color: [0, 0, 255, 150] },
    { name: "pool table", color: [255, 71, 0, 500] },
    { name: "pillow", color: [0, 235, 255, 150] },
    { name: "screen door", color: [0, 173, 255, 500] },
    { name: "stairway", color: [31, 0, 255, 150] },
    { name: "river", color: [11, 200, 200, 150] },
    { name: "bridge", color: [255, 82, 0, 150] },
    { name: "bookcase", color: [0, 255, 245, 150] },
    { name: "blind", color: [0, 61, 255, 150] },
    { name: "coffee table", color: [0, 255, 112, 500] },
    { name: "toilet", color: [0, 255, 133, 150] },
    { name: "flower", color: [255, 0, 0, 150] },
    { name: "book", color: [255, 163, 0, 150] },
    { name: "hill", color: [255, 102, 0, 150] },
    { name: "bench", color: [194, 255, 0, 150] },
    { name: "countertop", color: [0, 143, 255, 150] },
    { name: "stove", color: [51, 255, 0, 150] },
    { name: "palm", color: [0, 82, 255, 150] },
    { name: "kitchen island", color: [0, 255, 41, 500] },
    { name: "computer", color: [0, 255, 173, 150] },
    { name: "swivel chair", color: [10, 0, 255, 500] },
    { name: "boat", color: [173, 255, 0, 150] },
    { name: "bar", color: [0, 255, 153, 150] },
    { name: "arcade machine", color: [255, 92, 0, 500] },
    { name: "hovel", color: [255, 0, 255, 150] },
    { name: "bus", color: [255, 0, 245, 150] },
    { name: "towel", color: [255, 0, 102, 150] },
    { name: "light", color: [255, 173, 0, 150] },
    { name: "truck", color: [255, 0, 20, 150] },
    { name: "tower", color: [255, 184, 184, 150] },
    { name: "chandelier", color: [0, 31, 255, 150] },
    { name: "awning", color: [0, 255, 61, 150] },
    { name: "streetlight", color: [0, 71, 255, 150] },
    { name: "booth", color: [255, 0, 204, 150] },
    { name: "television receiver", color: [0, 255, 194, 500] },
    { name: "airplane", color: [0, 255, 82, 150] },
    { name: "dirt track", color: [0, 10, 255, 500] },
    { name: "apparel", color: [0, 112, 255, 150] },
    { name: "pole", color: [51, 0, 255, 150] },
    { name: "land", color: [0, 194, 255, 150] },
    { name: "bannister", color: [0, 122, 255, 150] },
    { name: "escalator", color: [0, 255, 163, 150] },
    { name: "ottoman", color: [255, 153, 0, 150] },
    { name: "bottle", color: [0, 255, 10, 150] },
    { name: "buffet", color: [255, 112, 0, 150] },
    { name: "poster", color: [143, 255, 0, 150] },
    { name: "stage", color: [82, 0, 255, 150] },
    { name: "van", color: [163, 255, 0, 150] },
    { name: "ship", color: [255, 235, 0, 150] },
    { name: "fountain", color: [8, 184, 170, 150] },
    { name: "conveyer belt", color: [133, 0, 255, 500] },
    { name: "canopy", color: [0, 255, 92, 150] },
    { name: "washer", color: [184, 0, 255, 150] },
    { name: "plaything", color: [255, 0, 31, 150] },
    { name: "swimming pool", color: [0, 184, 255, 500] },
    { name: "stool", color: [0, 214, 255, 150] },
    { name: "barrel", color: [255, 0, 112, 150] },
    { name: "basket", color: [92, 255, 0, 150] },
    { name: "waterfall", color: [0, 224, 255, 150] },
    { name: "tent", color: [112, 224, 255, 150] },
    { name: "bag", color: [70, 184, 160, 150] },
    { name: "minibike", color: [163, 0, 255, 150] },
    { name: "cradle", color: [153, 0, 255, 150] },
    { name: "oven", color: [71, 255, 0, 150] },
    { name: "ball", color: [255, 0, 163, 150] },
    { name: "food", color: [255, 204, 0, 150] },
    { name: "step", color: [255, 0, 143, 150] },
    { name: "tank", color: [0, 255, 235, 150] },
    { name: "trade name", color: [133, 255, 0, 500] },
    { name: "microwave", color: [255, 0, 235, 150] },
    { name: "pot", color: [245, 0, 255, 150] },
    { name: "animal", color: [255, 0, 122, 150] },
    { name: "bicycle", color: [255, 245, 0, 150] },
    { name: "lake", color: [10, 190, 212, 150] },
    { name: "dishwasher", color: [214, 255, 0, 150] },
    { name: "screen", color: [0, 204, 255, 150] },
    { name: "blanket", color: [20, 0, 255, 150] },
    { name: "sculpture", color: [255, 255, 0, 150] },
    { name: "hood", color: [0, 153, 255, 150] },
    { name: "sconce", color: [0, 41, 255, 150] },
    { name: "vase", color: [0, 255, 204, 150] },
    { name: "traffic light", color: [41, 0, 255, 500] },
    { name: "tray", color: [41, 255, 0, 150] },
    { name: "ashcan", color: [173, 0, 255, 150] },
    { name: "fan", color: [0, 245, 255, 150] },
    { name: "pier", color: [71, 0, 255, 150] },
    { name: "crt screen", color: [122, 0, 255, 500] },
    { name: "plate", color: [0, 255, 184, 150] },
    { name: "monitor", color: [0, 92, 255, 150] },
    { name: "bulletin board", color: [184, 255, 0, 500] },
    { name: "shower", color: [0, 133, 255, 150] },
    { name: "radiator", color: [255, 214, 0, 150] },
    { name: "glass", color: [25, 194, 194, 150] },
    { name: "clock", color: [102, 255, 0, 150] },
    { name: "flag", color: [92, 0, 255, 150] }
]

const generalSegmentationExamples: string[] = [
    "/segment/image-1.jpg",
    "/segment/image-2.jpg",
    "/segment/image-3.jpg",
    "/segment/image-4.jpg",
    "/segment/image-5.jpg",
    "/segment/image-6.jpg",
]

export const generalSegmentationModels: Metadata[] = [
    {
        title: "Small model (SegFormer B0, 4 MB)",
        models: new Map<string, string>([
            ["segment-model", "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/b0.onnx"],
        ]),
        classes: generalSegmentationClasses,
        examples: generalSegmentationExamples
    },
    {
        title: "Larger model (SegFormer B1, 14 MB)",
        models: new Map<string, string>([
            ["segment-model", "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/b1.onnx"],
        ]),
        classes: generalSegmentationClasses,
        examples: generalSegmentationExamples
    },
    {
        title: "Large model (SegFormer B4, 64 MB)",
        models: new Map<string, string>([
            ["segment-model", "https://edge-ai-models.s3.us-east-2.amazonaws.com/segment/b4.onnx"],
        ]),
        classes: generalSegmentationClasses,
        examples: generalSegmentationExamples
    }
]