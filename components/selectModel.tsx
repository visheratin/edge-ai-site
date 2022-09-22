import { useRef, useState } from "react"
import { ModelMetadata } from "../data/modelMeta"
import { useSessionContext } from "./sessionContext"
import * as ort from 'onnxruntime-web';
import { SessionInfo } from "../data/sessionInfo"

ort.env.wasm.numThreads = 3
ort.env.wasm.simd = true

interface ModelSelectProps {
  models: ModelMetadata[]
}

/**
 * ModelSelect component provides functionality of selecting the model from the list of 
 * available models, create ORT sessions for every .onnx file of that model, and save 
 * all sessions to the session context so the sessions could be used in other components.
 */
const ModelSelect = (props: ModelSelectProps) => {
  const [loader, setLoader] = useState({ hidden: true }) // loader spinner state
  const [_, setSessionInfo] = useSessionContext() // method for setting session context
  const modelSelectRef = useRef<HTMLSelectElement>(null) // reference for the model selector element

  /**
   * createSession extracts the model file and creates an ORT session using it.
   * @param modelPath URL for the model .onnx file
   * @returns ORT session
   */
  const createSession = async (modelPath: string): Promise<ort.InferenceSession> => {
    const model_data = await fetch(modelPath).then(resp => resp.arrayBuffer())
    const start = new Date();
    const session = await ort.InferenceSession.create(
      model_data,
      {
        executionProviders: ['wasm'],
        graphOptimizationLevel: 'all',
        enableCpuMemArena: true,
        enableMemPattern: true,
        executionMode: 'parallel'
      }
    );
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    console.log(`Session creation time: ${elapsed} seconds.`)
    return session
  }

  /**
   * loadModel gets the model metadata based on the selected model, creates ORT sessions
   * for all model files, and sets the session context.
   * @returns 
   */
  const loadModel = async () => {
    const selectedIdx = modelSelectRef.current?.selectedIndex
    if (selectedIdx === 0) {
      return
    }
    setLoader({ hidden: false })
    let sessions: Map<string, ort.InferenceSession> = new Map<string, ort.InferenceSession>()
    for (const [name, path] of props.models[selectedIdx - 1].models) {
      const session = await createSession(path)
      sessions.set(name, session)
    }
    const info: SessionInfo = {
      sessions: sessions,
      meta: props.models[selectedIdx - 1]
    }
    setSessionInfo(info)
    setLoader({ hidden: true })
  }

  return (
    <div className="row">
      <div className="col l9 s12">
        <form action="#">
          <div className="input-field">
            <select ref={modelSelectRef} className="browser-default" id="modelSelect">
              <option value="" disabled selected>Select the model</option>
              {props.models.map((e, key) => {
                return <option key={key}>{e.title}</option>
              })}
            </select>
          </div>
        </form>
      </div>
      <div className="col l2 s12">
        <div className="input-field">
          <button className="btn waves-effect waves-light" style={{ width: "100%" }} onClick={loadModel}>Load</button>
        </div>
      </div>
      <div className="col l1 s12 input-field center-align">
        <div className={loader.hidden ? "hide" : ""}>
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelSelect