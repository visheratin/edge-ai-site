import React, { useLayoutEffect, useRef, useState } from "react"
import * as ort from 'onnxruntime-web';
import { useSessionContext } from "../pages/sessionContext";

interface ORTSessionProps {
  modelPath: string
}

const ORTSession = (props: ORTSessionProps) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  const [_, setSession] = useSessionContext()

  useLayoutEffect(() => {
    const initSession = async () => {
      const start = new Date();
      const session = await ort.InferenceSession.create(
        props.modelPath,
        {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all'
        }
      );
      const end = new Date();
      const inferenceTime = (end.getTime() - start.getTime()) / 1000;
      console.log(`Inference session created in ${inferenceTime} seconds`)
      if (loaderRef.current) {
        loaderRef.current.className = "hide"
      }
      setSession(session)
    }

    initSession()
  }, []);

  return (
    <>
      <div ref={loaderRef}>
        <div className="row center-align">
          <div className="col s12">
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
            <div>
              Loading the model
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ORTSession