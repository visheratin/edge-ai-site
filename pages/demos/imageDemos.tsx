import Image from "next/image";
import segmentPic from "../../public/index/segment.jpg";
import classificationPic from "../../public/index/classification.jpg";
import detectionPic from "../../public/index/detection.jpg";
import bowtiePic from "../../public/index/bowtie.jpg";

const ImageDemos = () => {
  return (
    <>
      <div className="row">
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/sem-segment">
                <Image src={bowtiePic} alt="Picture" />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Microscope image segmentation</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/sem-segment">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/segment">
                <Image src={segmentPic} alt="Picture" />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Semantic image segmentation</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/segment">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/classification">
                <Image src={classificationPic} alt="Picture" />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Image classification</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/classification">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/object-detection">
                <Image src={detectionPic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Object detection</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/object-detection">Open demo</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDemos;
