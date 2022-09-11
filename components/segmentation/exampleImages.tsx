import Image from "next/image"

interface ExampleImagesProps {
  imageURLs: string[]
  setImageFunc: any
}

const ExampleImages = (props: ExampleImagesProps) => {
  const setImage = (e) => {
    props.setImageFunc({ value: e.target.src })
  }

  return (
    <>
      <h6 className="left-align">Example images</h6>
      <div className="row">
        {
          props && props.imageURLs.map((url, key) => {
            return (
              <div className="col s4">
                <Image src={url} width={200} height={200} onClick={setImage} />
              </div>
            )
          })}
      </div>
    </>
  )
}

export default ExampleImages