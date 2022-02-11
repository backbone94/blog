import Header from "../Header";
import { useState } from "react";

let i = 0;
const Lang = () => {
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
      <Header />
      <div className="frame">
        {frame.map((f) => {
          return (
            <div key={f.id}>
              <img
                className="frameElement"
                alt={`${f.name}`}
                src={`images/${f.name}.ico`}
              />
              <text className="frameText">{`${f.name}`}</text>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lang;
