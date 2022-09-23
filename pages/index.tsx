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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis ligula nec mi fringilla, in egestas lacus lobortis.
                Donec non viverra diam. Proin convallis enim ac velit iaculis, non venenatis dui eleifend.</p>
            </div>
            <div className="card-action">
              <a href="models/sem-segment">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <Image src={bowtiePic} />
            </div>
            <div className="card-content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque convallis ligula nec mi fringilla, in egestas lacus lobortis.
                Donec non viverra diam. Proin convallis enim ac velit iaculis, non venenatis dui eleifend.</p>
            </div>
            <div className="card-action">
              <a href="models/grammar-check">Open demo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
