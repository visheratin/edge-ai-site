import type { NextPage } from 'next';
import SegmentationComponent from '../../components/segmentation/segmentation'
import { ORTSessionProvider } from '../../components/sessionContext'


const SEMSegmentation: NextPage = () => {
  return (
    <ORTSessionProvider>
      <div className="container">
        <div className="row">
          <h1 className="header">Microscopy images segmentation</h1>
          <div className="col s12">
            <p>
              Info about the demo
            </p>
          </div>
        </div>
        <div className="row">
          <SegmentationComponent />
        </div>
      </div>
    </ORTSessionProvider>
  )
}

export default SEMSegmentation
