import Image from "next/image";
import segmentPic from "../../../public/index/segment.jpg";
import classificationPic from "../../../public/index/classification.jpg";
import detectionPic from "../../../public/index/detection.jpg";
import bowtiePic from "../../../public/index/bowtie.jpg";

const ImageDemos = () => {
  return (
    <>
      <div className="row">
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/image/sem-segment">
                <Image src={bowtiePic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Microscope image segmentation</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/image/sem-segment">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/image/segment">
                <Image src={segmentPic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Semantic image segmentation</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/image/segment">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/image/classification">
                <Image src={classificationPic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Image classification</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/image/classification">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/image/object-detection">
                <Image src={detectionPic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Object detection</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/image/object-detection">Open demo</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDemos;
