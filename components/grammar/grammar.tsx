import { useRef, useState } from "react"
import { grammarModels } from "./models"
import SelectModel from "../selectModel"
import Tokenizer from "./tokenizers"
import T5ForConditionalGeneration from "./transformers"
import { SessionInfo } from "../../data/sessionInfo"
import { datadogLogs } from "@datadog/browser-logs"
import { useSessionContext } from "../sessionContext"
import { split } from "sentence-splitter";

const Diff = require("diff")

interface SentencePart {
  type: string
  value: string
}

const GrammarCheckComponent = () => {
  const [loader, setLoader] = useState({ loading: false })
  const [output, setOutput] = useState({ value: "Here will be the output" })
  const [diff, setDiff] = useState({ value: "" })
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputTimeout, setInputTimeout] = useState({ value: null })

  const [tokenizer, setTokenizer] = useState({ instance: null })
  const [model, setModel] = useState({ instance: null })

  // create session context that stores loaded inference sessions
  const [sessionInfo, _] = useSessionContext()
  const [processedParts, setProcessedParts] = useState({ instance: new Map<string, string>() })

  const initModel = async (sessionInfo: SessionInfo) => {
    const response = await fetch(sessionInfo.meta.tokenizer);
    const tokenizer = Tokenizer.fromConfig(await response.json());
    setTokenizer({ instance: tokenizer })
    const model = new T5ForConditionalGeneration(sessionInfo.sessions.get("encoder"), sessionInfo.sessions.get("init-decoder"), sessionInfo.sessions.get("decoder"))
    setModel({ instance: model })
  }

  const inputChanged = async (e: Event) => {
    e.preventDefault()
    if (inputTimeout.value) {
      clearTimeout(inputTimeout.value)
    }
    let timeout = setTimeout(processInput, 750)
    setInputTimeout({ value: timeout })
  }

  const splitText = (text: string): Array<SentencePart> => {
    let parts = split(text)
    let result: Array<SentencePart> = new Array<SentencePart>()
    for (let part of parts) {
      if (part.type === "Sentence") {
        for (let childNode of part.children) {
          result.push({ type: childNode.type, value: childNode.value })
        }
      } else {
        result.push({ type: part.type, value: part.value })
      }
    }
    return result
  }

  const processTextPart = async (input: string): Promise<string> => {
    const generationOptions = {
      "maxLength": 500,
      "topK": 0,
    }
    const inputTokenIds = tokenizer.instance.encode(input)
    const outputTokenIds = await model.instance.generate(inputTokenIds, generationOptions);
    let output: string = tokenizer.instance.decode(outputTokenIds, true).trim();
    output = output.trim()
    return output
  }

  const processInput = async () => {
    const value = inputRef.current?.value
    if (value === "" || value === undefined) {
      return
    }
    let textParts = splitText(value)
    setLoader({ loading: true })
    let result = ""
    const start = new Date();
    for (let part of textParts) {
      if (part.type === "Str") {
        if (processedParts.instance.has(part.value)) {
          result = result.concat(processedParts.instance.get(part.value))
        } else {
          const output = await processTextPart(part.value)
          result = result.concat(output)
          processedParts.instance.set(part.value, output)
        }
      } else {
        if (!result.endsWith(part.value)) {
          result = result.concat(part.value)
        }
      }
    }
    setProcessedParts({ instance: processedParts.instance })
    const end = new Date();
    const elapsed = (end.getTime() - start.getTime()) / 1000;
    datadogLogs.logger.info('Inference finished.', {
      input_length: value.length,
      elapsed_seconds: elapsed,
    })
    console.log(`Inference time: ${elapsed} seconds.`)
    setOutput({ value: result })
    const diff = Diff.diffChars(value, result);
    let diffValue = ""
    diff.forEach((part) => {
      if (part.added) {
        diffValue += `<span style="color: green; font-weight: bold">${part.value}</span>`
      } else if (part.removed) {
        diffValue += `<span style="color: red; font-weight: bold">${part.value}</span>`
      } else {
        diffValue += `${part.value}`
      }
    })
    setDiff({ value: diffValue })
    setLoader({ loading: false })
  }

  return (
    <>
      <SelectModel models={grammarModels} callback={initModel} />
      <div className="row">
        <div className="progress">
          <div className={loader.loading ? "indeterminate" : "determinate"}></div>
        </div>
        <div className="col l12 s12">
          <h6>Input</h6>
          <textarea
            ref={inputRef}
            className="materialize-textarea"
            onChange={inputChanged}
            disabled={!sessionInfo || !sessionInfo.sessions}
            placeholder="Start typing here"></textarea>
        </div>
        <div className="col l12 s12">
          <h6>Output</h6>
          <div className="col l12 s12 grey lighten-5" style={{ minHeight: "50px" }} dangerouslySetInnerHTML={{ __html: output.value }}></div>
        </div>
        <div className="col l12 s12">
          <h6>Difference</h6>
          <div className="col l12 s12 grey lighten-5" style={{ minHeight: "50px" }} dangerouslySetInnerHTML={{ __html: diff.value }}></div>
        </div>
      </div>
    </>
  )
}

export default GrammarCheckComponent