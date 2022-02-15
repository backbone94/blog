import "../../css/frame.css";
import { useState } from "react";

let i = 0;
const Frame = () => {
  let [frame] = useState([
    { id: i++, name: "Webpack" },
    { id: i++, name: "Node.js" },
    { id: i++, name: "Vue" },
    { id: i++, name: "React" },
    { id: i++, name: "Redux" },
    { id: i++, name: "Next.js" },
  ]);

  return (
    <>
      <div className="frame">
        {frame.map((f) => {
          return (
            <div key={f.id}>
              <img
                className="frameElement"
                alt={`${f.name}`}
                src={`images/${f.name}.ico`}
              />
              <div className="frameText">{`${f.name}`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Frame;
