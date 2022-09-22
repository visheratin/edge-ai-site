import { ModelClass } from "../../data/modelMeta"

interface ColorSchemaProps {
  classes: ModelClass[]
}

const ColorSchema = (props: ColorSchemaProps) => {
  return (
    <>
      <h6 className="left-align">Color schema</h6>
      <table className="centered">
        <thead>
          <tr>
            <th>Color</th>
            <th>Class name</th>
          </tr>
        </thead>
        <tbody>
          {
            props && props.classes.map((e, key) => {
              const code = `rgba(${e.color[0]},${e.color[1]},${e.color[2]},${e.color[3] / 255.0})`
              return (
                <tr>
                  <td style={{ backgroundColor: code }}></td>
                  <td>{e.name}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default ColorSchema