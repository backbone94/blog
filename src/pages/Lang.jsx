import Header from "../Header";
import { useState } from "react";

let i = 0;
const Lang = () => {
  let [lang, setLang] = useState([
    { id: i++, name: "HTML" },
    { id: i++, name: "CSS" },
    { id: i++, name: "SCSS" },
    { id: i++, name: "Javascript" },
    { id: i++, name: "Typescript" },
  ]);

  return (
    <>
      <Header />
      <div className="lang">
        {lang.map((l) => {
          return (
            <div key={l.id}>
              <img
                className="langElement"
                alt={`${l.name}`}
                src={`images/${l.name}.ico`}
              />
              <text className="langText">{`${l.name}`}</text>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lang;
