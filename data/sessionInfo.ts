import * as ort from 'onnxruntime-web';
import { ModelMetadata } from './modelMeta';

export interface SessionInfo {
    session: ort.InferenceSession
    meta: ModelMetadata
}