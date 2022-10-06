import type { NextPage } from "next";
import Head from "next/head";
import GrammarCheckComponent from "../../components/grammar/grammar";
import { ORTSessionProvider } from "../../components/sessionContext";

const GrammarCheck: NextPage = () => {
  return (
    <ORTSessionProvider>
      <Head>
        <title>Standalone grammar correction - Edge AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h2 className="header">Standalone grammar correction</h2>
          <div className="col s12">
            <h6>About the demo</h6>
            <p></p>
            <h6>How to use the demo:</h6>
            <p>
              Load the model and start typing. The model will run as soon as you
              stop.
            </p>
          </div>
        </div>
        <div className="row">
          <GrammarCheckComponent />
        </div>
      </div>
    </ORTSessionProvider>
  );
};

export default GrammarCheck;
