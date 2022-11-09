import Image from "next/image";

interface ExampleImagesProps {
  imageURLs: string[];
  setImageFunc: any;
}

/**
 * ExampleImages is a component for showing a gallery with sample images.
 */
const ExampleImages = (props: ExampleImagesProps) => {
  const setImage = (e: any) => {
    props.setImageFunc(e.target.src);
  };

  return (
    <>
      <h6 className="left-align">Example images (click to set the image)</h6>
      <div className="row">
        {props &&
          props.imageURLs.map((url, key) => {
            return (
              <div className="col s4">
                <Image src={url} width={200} height={200} onClick={setImage} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ExampleImages;
