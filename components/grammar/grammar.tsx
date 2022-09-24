import { useRef, useState } from "react"
import { grammarModels } from "./models"
import SelectModel from "../selectModel"
import Tokenizer from "./tokenizers"

const GrammarCheckComponent = () => {
  const [loader, setLoader] = useState({ loading: false })
  const [output, setOutput] = useState({ value: "Here will the output" })
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputTimeout, setInputTimeout] = useState({ value: null })

  const loadTokenizer = async (url: string) => {
    const response = await fetch(url);
    const tokenizer = Tokenizer.fromConfig(await response.json());
    console.log(tokenizer)
  }

  const inputChanged = (e: Event) => {
    e.preventDefault()
    if (inputTimeout.value) {
      clearTimeout(inputTimeout.value)
    }
    let timeout = setTimeout(processInput, 750)
    setInputTimeout({ value: timeout })
  }

  const processInput = () => {
    const value = inputRef.current?.value
    const prompt = `translate English to French: ${value}`
    setLoader({ loading: true })
    setOutput({ value: prompt })
    setLoader({ loading: false })
  }

  return (
    <>
      <SelectModel models={grammarModels} />
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