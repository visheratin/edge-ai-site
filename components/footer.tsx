import React from "react"
import { SocialIcon } from "react-social-icons"

export default function Footer() {
  return (
    <>
      <footer className="white">
        <div className="divider"></div>
        <div className="container section">
          <div className="row">
            <div className="col offset-l3 l1 s4 center-align hide-on-small-only">
            </div>
            <div className="col l1 s3 center-align">
              <SocialIcon url="https://github.com/visheratin/edge-ai-site" target="_blank" />
            </div>
            <div className="col l1 s3 center-align">
              <SocialIcon url="https://www.linkedin.com/in/visheratin/" target="_blank" />
            </div>
            <div className="col l1 s3 center-align">
              <SocialIcon url="https://twitter.com/visheratin" target="_blank" />
            </div>
            <div className="col l1 s3 center-align">
              <SocialIcon url="mailto:alex@visheratin.com" target="_blank" />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}