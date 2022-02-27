import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadFolderListRequest } from "../redux/reducers/folderReducer";
import "../css/hamburger.css";

export default function Hamburger() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );
  const [isShow, setIsShow] = useState(false);

  // 햄버거 버튼 오픈
  const menuOpen = () => {
    setIsShow(!isShow);
    console.log(isShow);
  };

  // 카테고리 이동
  const moveCategory = (categoryTitle) => {
    // Home 으로 이동할 때는 Home 카테고리가 아닌, "/" 경로로 이동한다.
    if (categoryTitle !== "Home") {
      // 카테고리 이동하기 전에 미리 folder list 불러오기
      dispatch(loadFolderListRequest(categoryTitle));
      history.replace(`/${categoryTitle}`);
    } else if (categoryTitle === "Home") history.replace("/");
    setIsShow(!isShow);
  };

  return (
    <>
      <span onClick={menuOpen} className="hamburger">
        {isShow ? <CloseOutlined /> : <MenuOutlined />}
      </span>
      <div className={isShow ? "openMenu" : "closeMenu"}>
        {categoryList.map((category) => (
          <div key={category.id} className="listElement">
            {category.title === "Home" ? null : (
              <div onClick={() => moveCategory(category.title)}>
                {category.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
