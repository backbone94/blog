import "../css/header.css";
import { useHistory, Link } from "react-router-dom";
import { Button, Popconfirm, notification, message } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import HeaderLoading from "./loading/HeaderLoading";
import {
  addCategoryRequest,
  loadCategoryListRequest,
  removeCategoryRequest,
} from "../redux/reducers/categoryReducer";
import {
  clearPostListSuccess,
  clearPostListFailure,
} from "../redux/reducers/postReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MyButton from "./MyButton";
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
      setAdd(true);
      dispatch({ type: "CLEAR_ERROR_REQUEST" });
    }
  }, [dispatch, error]);

  // 카테고리 삭제 confirm 창
  const confirm = (id) => {
    dispatch(removeCategoryRequest(id));
    message.success({
      content: "카테고리를 삭제하였습니다.",
      style: {
        marginTop: "12vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
    history.push("/");
  };

  // 카테고리 추가
  const addCategory = () => {
    if (!title) {
      message.error({
        content: "카테고리 이름을 입력하세요.",
        style: {
          marginTop: "10vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
    } else {
      dispatch(addCategoryRequest(title));
      setAdd(false);
      setTitle("");
      history.push(`/${title}`);
    }
  };

  const movePage = (category) => {
    // Home 으로 이동할 때는 Home 카테고리가 아닌, "/" 경로로 이동한다.
    if (category !== "Home") history.push(`/${category}`);
    else if (category === "Home") history.push("/");
  };

  // 검색 페이지로 이동하기 전에 postList clear
  const goSearchPage = () => {
    try {
      dispatch(clearPostListSuccess());
    } catch (e) {
      console.log(e);
      dispatch(clearPostListFailure(e));
    }
    history.push("/searchPost");
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
                <label className="categoryElement" htmlFor={`${category.id}`}>
                  {category.title}
                </label>
                {category.title !== "Home" ? (
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    onConfirm={() => {
                      confirm(category.id);
                    }}
                    okText="네"
                    cancelText="아니오"
                  >
                    <CloseOutlined className="headerCloseIcon" />
                  </Popconfirm>
                ) : null}
                {index !== length - 1 ? <div className="divider" /> : null}
              </div>
            ))}

            {/* 카테고리 추가 버튼 */}
            {!add ? (
              <MyButton
                text={"Add Category"}
                onClick={() => setAdd(true)}
              ></MyButton>
            ) : (
              <div>
                <input
                  style={{ color: "black" }}
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <MyButton text={"추가"} marginLeft={5} onClick={addCategory} />
                <MyButton
                  text={"취소"}
                  marginLeft={5}
                  onClick={() => setAdd(false)}
                />
              </div>
            )}
          </div>

          {/* 검색, 로그인, 회원가입 부분*/}
          <div className="searchAndLogin">
            <div onClick={goSearchPage} className="searchIcon">
              <SearchOutlined />
            </div>
            <MyButton text={"로그인"} marginRight={10} />
            <Button style={{ borderRadius: "10%" }} type="primary">
              회원가입
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
