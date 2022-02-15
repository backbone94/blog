import "../../css/git.css";
import { useState } from "react";

let i = 0;
const Git = () => {
  let [git] = useState([
    { id: i++, name: "Tutorial" },
    { id: i++, name: "Markdown" },
  ]);

  return (
    <>
      <div className="git">
        {git.map((g) => {
          return (
            <div key={g.id}>
              <img
                className="gitElement"
                alt={`${g.name}`}
                src={`images/${g.name}.ico`}
              />
              <div className="gitText">{`${g.name}`}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Git;
