import type { NextPage } from 'next';
import GrammarCheckComponent from '../../components/grammar/grammar';
import { ORTSessionProvider } from '../../components/sessionContext'


const GrammarCheck: NextPage = () => {
  return (
    <ORTSessionProvider>
      <div className="container">
        <div className="row">
          <h1 className="header">Grammar checking</h1>
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
