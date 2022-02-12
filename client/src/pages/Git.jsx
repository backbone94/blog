import Header from "../Header";
import { useState } from "react";

let i = 0;
const Git = () => {
  let [git] = useState([
    { id: i++, name: "Tutorial" },
    { id: i++, name: "Markdown" },
  ]);

  return (
    <>
      <Header />
      <div className="frame">
        {git.map((g) => {
          return (
            <div key={g.id}>
              <img
                className="frameElement"
                alt={`${g.name}`}
                src={`images/${g.name}.ico`}
              />
              <text className="frameText">{`${g.name}`}</text>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Git;
