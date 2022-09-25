import { useRef, useState } from "react"
import { grammarModels } from "./models"
import SelectModel from "../selectModel"
import Tokenizer from "./tokenizers"
import T5ForConditionalGeneration from "./transformers"
import { useSessionContext } from "../sessionContext"
import { SessionInfo } from "../../data/sessionInfo"
import { delay } from "lodash"

const GrammarCheckComponent = () => {
  const [loader, setLoader] = useState({ loading: false })
  const [output, setOutput] = useState({ value: "Here will the output" })
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputTimeout, setInputTimeout] = useState({ value: null })

  const [tokenizer, setTokenizer] = useState({ instance: null })
  const [model, setModel] = useState({ instance: null })

  const initModel = async (sessionInfo: SessionInfo) => {
    const response = await fetch(sessionInfo.meta.tokenizer);
    const tokenizer = Tokenizer.fromConfig(await response.json());
    setTokenizer({ instance: tokenizer })
    const model = new T5ForConditionalGeneration(sessionInfo.sessions.get("encoder"), sessionInfo.sessions.get("init-decoder"), sessionInfo.sessions.get("decoder"))
    setModel({ instance: model })
  }

  const inputChanged = (e: Event) => {
    e.preventDefault()
    if (inputTimeout.value) {
      clearTimeout(inputTimeout.value)
    }
    let timeout = setTimeout(processInput, 750)
    setInputTimeout({ value: timeout })
  }

  const processInput = async () => {
    const value = inputRef.current?.value
    const prompt = `correct: ${value}`
    setLoader({ loading: true })
    const inputTokenIds = tokenizer.instance.encode(prompt)
    const generationOptions = {
      "maxLength": 5000,
      "topK": 0,
    };
    const outputTokenIds = await model.instance.generate(inputTokenIds, generationOptions);
    const output = tokenizer.instance.decode(outputTokenIds, true).trim();
    setOutput({ value: output })
    setLoader({ loading: false })
  }

  return (
    <>
      <SelectModel models={grammarModels} callback={initModel} />
      <div className="row">
        <div className="progress">
          <div className={loader.loading ? "indeterminate" : "determinate"}></div>
        </div>
        <div className="col l6 s12">
          <h6>Input</h6>
          <textarea ref={inputRef} className="materialize-textarea" rows={5} onChange={inputChanged}></textarea>
        </div>
        <div className="col l6 s12">
          <h6>Output</h6>
          <div className="col l12 s12 grey lighten-4" style={{ minHeight: "50px" }}>{output.value}</div>
        </div>
      </div>
    </>
  )
}

export default GrammarCheckComponent