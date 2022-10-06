import { ModelClass } from "../../data/modelMeta";

/**
 ColorSchemaProps stores the array of classes on which the segmentation model was trained.
*/
interface ColorSchemaProps {
  classes: ModelClass[];
  foundIndices: Set<number>;
}

/**
 ColorSchema is a component for displaying the classes on which the segmentation model was trained.
*/
const ColorSchema = (props: ColorSchemaProps) => {
  return (
    <>
      {props && props.classes && props.foundIndices.size > 0 && (
        <>
          <table className="centered">
            <thead>
              <tr>
                <th>Color</th>
                <th>Class name</th>
              </tr>
            </thead>
            <tbody>
              {props.classes.map((e, idx) => {
                if (!props.foundIndices || !props.foundIndices.has(idx)) {
                  return;
                }
                const code = `rgba(${e.color[0]},${e.color[1]},${e.color[2]},${
                  e.color[3] / 255.0
                })`;
                return (
                  <tr>
                    <td style={{ backgroundColor: code }}></td>
                    <td>{e.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ColorSchema;
