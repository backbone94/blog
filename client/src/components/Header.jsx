import "../css/header.css";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import { useState, useEffect } from "react";
import HeaderLoading from "./loading/HeaderLoading";
import { loadCategoryListRequest } from "../redux/reducers/categoryReducer";
import { loadFolderListRequest } from "../redux/reducers/folderReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import RightClick from "./RightClick";
import AddCategory from "./AddCategory";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.categoryReducer.error);
  const loading = useSelector((state) => state.categoryReducer.loading);
  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );
  const length = categoryList.length;

  // 카테고리 List 불러오기
  useEffect(() => {
    dispatch(loadCategoryListRequest());
  }, [dispatch]);

  // error 값이 존재하면 Alert 창 띄우기
  useEffect(() => {
    if (error) {
      notification.error({
        style: { fontFamily: '"Gamja Flower", cursive' },
        message: "에러",
        description: `${error}`,
      });
      dispatch({ type: "CLEAR_ERROR_REQUEST" });
    }
  }, [dispatch, error]);

  const movePage = (category) => {
    // Home 으로 이동할 때는 Home 카테고리가 아닌, "/" 경로로 이동한다.
    if (category !== "Home") {
      // 카테고리 이동하기 전에 미리 folder list 불러오기
      dispatch(loadFolderListRequest(category));
      history.replace(`/${category}`);
    } else if (category === "Home") history.replace("/");
  };

  return (
    <>
      {/* category List 불러오기 */}
      {loading ? (
        <HeaderLoading />
      ) : (
        <div className="headerContainer">
          <div className="categoryListContainer">
            {categoryList.map((category, index) => (
              <div key={category.id} className="categoryElementContainer">
                {/* 라디오그룹으로 카테고리 묶음 */}
                <input
                  id={`${category.id}`}
                  type="radio"
                  name="category"
                  onClick={() => movePage(category.title)}
                  className="radioCircle"
                  value={`${category.title}`}
                />
                {/* 우클릭 */}
                <RightClick
                  tag={
                    <label
                      className="categoryElement"
                      htmlFor={`${category.id}`}
                    >
                      {category.title}
                    </label>
                  }
                  setTitle={setTitle}
                  title={title}
                  category={category}
                />
                {index !== length - 1 ? <div className="divider" /> : null}
              </div>
            ))}

            {/* 카테고리 추가 버튼 */}
            <AddCategory
              add={add}
              setAdd={setAdd}
              title={title}
              setTitle={setTitle}
            />
          </div>

          {/* 검색, 로그인, 회원가입 부분*/}
          <HeaderRight />
        </div>
      )}
    </>
  );
};

export default Header;
