import { useState } from "react"
import { grammarModels } from "../../data/grammarModels"
import SelectModel from "../selectModel"

const GrammarCheckComponent = () => {
  const [loader, setLoader] = useState({ loading: false })

  return (
    <>
      <SelectModel models={grammarModels} />
      <div className="row">
        <div className="progress">
          <div className={loader.loading ? "indeterminate" : "determinate"}></div>
        </div>
        <div className="col l6 s12">
          <h6>Input</h6>
          <textarea className="materialize-textarea" rows={5}></textarea>
        </div>
        <div className="col l6 s12">
          <h6>Output</h6>
          <div className="col l12 s12 grey lighten-4" style={{ minHeight: "50px" }}></div>
        </div>
      </div>
    </>
  )
}

export default GrammarCheckComponent