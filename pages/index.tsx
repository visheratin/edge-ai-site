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
          <h2 className="header">Modern models, directly in your browser</h2>
          <div className="col s12">
            <p>
              Edge AI is a concept of deploying AI models to the devices that produce the data. It can be surveillance  cameras placed
              in remote areas, radiology equipment in medical centers, or even your laptop. There are multiple benefits from that:
            </p>
            <ol>
              <li>
                <b>Security.</b> When running inference on the device, we ensure that the data is not compromised on its way to the
                remote server or the server itself. This is especially important when working with <a
                  href="https://developer.nvidia.com/blog/healthcare-at-the-edge/" target="_blank"
                >
                  medical data
                </a> or <a
                  href="https://www.computer.org/csdl/magazine/sp/2021/04/09475182/1uZskexqBJ6" target="_blank"
                >
                  confidential information
                </a>.
              </li>
              <li>
                <b>Latency.</b> Even though edge devices are less computationally performant than data centers packed with high-end hardware,
                sending the raw data from the device may be either slow or unavailable. Examples of this include <a
                  href="https://www.aiacceleratorinstitute.com/shaping-the-future-of-agriculture-with-edge-ai-devices/" target="_blank"
                >
                  agriculture
                </a> and <a
                  href="https://www.seeedstudio.com/blog/2022/08/19/using-grafana-for-real-time-ai-powered-microscopy-image-analysis-at-the-edge/"
                >
                  microscopy
                </a>.
              </li>
              <li>
                <b>Cost savings.</b> When models are deployed at the devices, you, as a service provider, no longer need to run expensive
                infrastructure to support all your users. You can scale at virtually no cost and put more computational resources
                towards developing better models for business needs.
              </li>
            </ol>
            <p>

            </p>
          </div>
        </div>
        <div className="row">
          <div className="col l12">
            <h5>Demos</h5>
          </div>
        </div>
        <div className="row">
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
                <Link href="models/grammar-check">
                  <a>
                    <Image src={grammarPic} />
                  </a>
                </Link>
              </div>
              <div className="card-content">
                <h6>Standalone grammar correction</h6>
              </div>
              <div className="card-action">
                <Link href="models/grammar-check">
                  <a>Open demo</a>
                </Link>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </>
  )
}

export default Home
