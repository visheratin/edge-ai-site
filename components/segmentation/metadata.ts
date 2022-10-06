import { ModelMetadata } from "../../data/modelMeta";

export interface ModelClass {
  name: string;
  color: number[];
}

export interface Metadata extends ModelMetadata {
  classes: ModelClass[];
}
