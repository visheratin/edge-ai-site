import type { NextPage } from 'next';
import Head from 'next/head';
import GrammarCheckComponent from '../../components/grammar/grammar';
import { ORTSessionProvider } from '../../components/sessionContext'


const GrammarCheck: NextPage = () => {
  return (
    <ORTSessionProvider>
      <Head>
        <title>Standalone grammar correction - Edge AI</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container">
        <div className="row">
          <h1 className="header">Standalone grammar correction</h1>
          <div className="col s12">
            <p>
              Info about the demo
            </p>
          </div>
        </div>
        <div className="row">
          <GrammarCheckComponent />
        </div>
      </div>
    </ORTSessionProvider>
  )
}

export default GrammarCheck
