import type { NextPage } from "next";
import Image from "next/image"
import bowtiePic from "../public/index/bowtie.png"

const Home: NextPage = () => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="header">Edge AI demo</h1>
        <div className="col s12">
          <p>
            Info about the project
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <Image src={bowtiePic} />
            </div>
            <div className="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
            </div>
            <div className="card-action">
              <a href="models/sem-segment">Open demo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
