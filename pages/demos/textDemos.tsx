import Image from "next/image";
import grammarPic from "../../public/index/grammar.png";

const TextDemos = () => {
  return (
    <>
      <div className="row">
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/grammar-check">
                <Image src={grammarPic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Standalone grammar correction</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/grammar-check">Open demo</a>
            </div>
          </div>
        </div>
        <div className="col l4 m6 s12">
          <div className="card">
            <div className="card-image">
              <a href="/demos/text-feature-extraction">
                <Image src={grammarPic} />
              </a>
            </div>
            <div className="card-content">
              <h6>
                <b>Feature extraction</b>
              </h6>
            </div>
            <div className="card-action">
              <a href="/demos/text-feature-extraction">Open demo</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextDemos;
