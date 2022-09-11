import { useRef, useState } from "react"
import { ModelMetadata } from "../data/modelMeta"
import { useSessionContext } from "../pages/sessionContext"
import * as ort from 'onnxruntime-web';
import { SessionInfo } from "../data/sessionInfo"

interface ModelSelectProps {
  models: ModelMetadata[]
}

const ModelSelect = (props: ModelSelectProps) => {
  const [loader, setLoader] = useState({ hidden: true })
  const [_, setSessionInfo] = useSessionContext()
  const modelSelectRef = useRef<HTMLSelectElement>(null)

  const loadModel = async () => {
    const modelPath = modelSelectRef.current?.selectedOptions[0].value
    const selectedIdx = modelSelectRef.current?.selectedIndex
    if (modelPath === "") {
      return
    }
    setLoader({ hidden: false })
    const start = new Date();
    const session = await ort.InferenceSession.create(
      modelPath,
      {
        executionProviders: ['wasm'],
        graphOptimizationLevel: 'all'
      }
    );
    const end = new Date();
    const inferenceTime = (end.getTime() - start.getTime()) / 1000;
    console.log(`Inference session created in ${inferenceTime} seconds`)
    setLoader({ hidden: true })
    const info: SessionInfo = {
      session: session,
      meta: props.models[selectedIdx - 1]
    }
    setSessionInfo(info)
  }

  return (
    <div className="row">
      <div className="col l9 s12">
        <form action="#">
          <div className="input-field">
            <select ref={modelSelectRef} className="browser-default" id="modelSelect">
              <option value="" disabled selected>Select the model</option>
              {props.models.map((e, key) => {
                return <option key={key} value={e.modelPath}>{e.title}</option>
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