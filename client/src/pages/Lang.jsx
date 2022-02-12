import Header from "../components/Header";
import { useState } from "react";
import AddLang from "../components/AddLang";
import { useSelector } from "react-redux";

const Lang = () => {
  const [addLang, setAddLang] = useState(false);
  const lang = useSelector((state) => state.lang);

  function funcAddLang() {
    setAddLang(true);
  }

  function closeForm() {
    setAddLang(false);
  }

  return (
    <>
      <Header />

      <div className="lang">
        <div className="langElements">
          {lang.map((l) => {
            return (
              <div key={l.text}>
                <img className="langElement" alt={`${l.text}`} src={l.img} />
                <text className="langText">{l.text}</text>
              </div>
            );
          })}
        </div>

        <div className="addLang">
          {addLang ? (
            <AddLang event={closeForm} />
          ) : (
            <button
              type="button"
              className="addLang btn btn-outline-secondary"
              onClick={funcAddLang}
            >
              추가
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Lang;
