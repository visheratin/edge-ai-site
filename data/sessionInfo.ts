import * as ort from 'onnxruntime-web';
import { ModelMetadata } from './modelMeta';

export interface SessionInfo {
    sessions: Map<string, ort.InferenceSession>
    meta: ModelMetadata
}