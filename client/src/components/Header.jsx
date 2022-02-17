import "../css/header.css";
import { useHistory } from "react-router-dom";

const Header2 = () => {
  const history = useHistory();
  const categoryList = ["Home", "Language", "Frame Work", "Git"];

  const length = categoryList.length;

  const movePage = (category) => {
    // Home 으로 이동할 때는 Home 카테고리가 아닌, "/" 경로로 이동한다.
    if (category !== "Home") history.push(`/${category}`);
    else if (category === "Home") history.push("/");
  };

  return (
    <div className="headerContainer">
      <div className="categoryListContainer">
        {categoryList.map((category, index) => (
          <div key={category} className="categoryElementContainer">
            {/* 라디오그룹으로 카테고리 묶음 */}
            <input
              id={`${category}`}
              type="radio"
              name="category"
              onClick={() => movePage(category)}
              className="radioCircle"
              value={`${category}`}
            />
            <label className="categoryElement" htmlFor={`${category}`}>
              {category}
            </label>
            {index !== length - 1 ? <div className="divider" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header2;
