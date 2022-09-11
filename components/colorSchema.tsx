import { modelClass } from "../data/modelMeta"
import { useSessionContext } from "../pages/sessionContext"

interface ColorSchemaProps {
  classes: modelClass[]
}

const ColorSchema = (props: ColorSchemaProps) => {
  const sessionInfo = useSessionContext()

  return (
    <>
      <h6 className="left-align">Color schema</h6>
      <table>
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