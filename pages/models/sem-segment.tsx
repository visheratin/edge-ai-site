import type { NextPage } from 'next';
import SegmentationComponent from '../../components/segmentation/segmentation'
import { semSegmentationModels } from '../../components/segmentation/models';
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
            <h6>How to use</h6>
            <ol>
              <li>Select the model and load it.</li>
              <li>Paste image URL, load the image from the device, or select one of example images.</li>
              <li>Generate segments.</li>
            </ol>
          </div>
        </div>
        <div className="row">
          <SegmentationComponent models={semSegmentationModels} />
        </div>
      </div>
    </ORTSessionProvider>
  )
}

export default SEMSegmentation
