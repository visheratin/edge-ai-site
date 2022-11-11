import type { NextPage } from "next";
import Head from "next/head";
import ImageDemos from "./imageDemos";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image processing demos - In-browser AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Image processing demos</h2>
          <div className="col s12"></div>
        </div>
        <ImageDemos />
      </div>
    </>
  );
};

export default Home;
