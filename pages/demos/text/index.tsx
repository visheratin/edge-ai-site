import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import grammarPic from "../../../public/index/grammar.png";
import TextDemos from "./textDemos";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image processing demos - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Text processing demos</h2>
          <div className="col s12"></div>
        </div>
        <TextDemos />
      </div>
    </>
  );
};

export default Home;
