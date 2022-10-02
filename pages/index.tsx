import type { NextPage } from "next"
import Head from 'next/head'
import Link from 'next/link'
import Image from "next/image"
import segmentPic from "../public/index/segment.png"
import bowtiePic from "../public/index/bowtie.png"
import grammarPic from "../public/index/grammar.png"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Edge AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h1 className="header">Modern models, *actually* in your browser</h1>
          <div className="col s12">
            <p>
              Info about the project
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col l12">
            <h5>Available demos</h5>
          </div>
        </div>
        <div className="row">
          <div className="col l4 m6 s12">
            <div className="card">
              <div className="card-image">
                <Link href="models/segment">
                  <a>
                    <Image src={segmentPic} />
                  </a>
                </Link>
              </div>
              <div className="card-content">
                <h6>Semantic images segmentation</h6>
              </div>
              <div className="card-action">
                <Link href="models/segment">
                  <a>Open demo</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col l4 m6 s12">
            <div className="card">
              <div className="card-image">
                <Link href="models/sem-segment">
                  <a>
                    <Image src={bowtiePic} />
                  </a>
                </Link>
              </div>
              <div className="card-content">
                <h6>Microscope images segmentation</h6>
              </div>
              <div className="card-action">
                <Link href="models/sem-segment">
                  <a>Open demo</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col l4 m6 s12">
            <div className="card">
              <div className="card-image">
                <Image src={grammarPic} />
              </div>
              <div className="card-content">
                <h6>Grammar correction</h6>
              </div>
              <div className="card-action">
                <a href="models/grammar-check">Open demo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
