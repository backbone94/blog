import "../css/header.css";
import { useHistory } from "react-router-dom";
import { Button, Popconfirm, notification, message } from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import HeaderLoading from "./loading/HeaderLoading";
import {
  addCategoryRequest,
  loadCategoryListRequest,
  removeCategoryRequest,
} from "../redux/reducers/categoryReducer";
import { searchPostRequest } from "../redux/reducers/postReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

let historyIndex = 0;

const Header = () => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [searchWord, setSearchWord] = useState("");
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

  // 검색 기능
  const onSearch = (e) => {
    setSearchWord(e.target.value);
    // 검색어를 썼다가 clear 아이콘 안 쓰고 지웠을 때,
    // 이전 컴포넌트로 돌아가기
    if (e.target.value === "") {
      history.go(-historyIndex);
      historyIndex = 0;
    } else {
      historyIndex++;
      history.push("/searchPost");
      dispatch(searchPostRequest(e.target.value));
    }
  };

  // 써진 검색어 clear 아이콘으로 한번에 지우고
  // 검색어의 길이만큼 뒤로 가기(=검색하기 전 컴포넌트로 돌아가기)
  const clearSearch = () => {
    history.go(-historyIndex);
    setSearchWord("");
    historyIndex = 0;
  };

  // error 값이 존재하면 Alert 창 띄우기
  useEffect(() => {
    if (error) {
      notification["error"]({
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
          marginTop: "12vh",
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
              <Button
                icon={<PlusCircleOutlined />}
                className="addCategoryButton"
                type="dashed"
                onClick={() => setAdd(true)}
              >
                Add Category
              </Button>
            ) : (
              <div>
                <input
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Button style={{ marginLeft: 5 }} onClick={addCategory}>
                  추가
                </Button>
                <Button style={{ marginLeft: 5 }} onClick={() => setAdd(false)}>
                  취소
                </Button>
              </div>
            )}
          </div>

          {/* 검색, 로그인, 회원가입 부분*/}
          <div className="searchAndLogin">
            <div className="inputContainer">
              <input
                placeholder="게시글 제목으로 검색"
                onChange={onSearch}
                value={searchWord}
                style={{ width: 200 }}
              />
              {searchWord ? (
                <CloseOutlined
                  onClick={clearSearch}
                  className="clearInputIcon"
                />
              ) : null}
            </div>
            <Button style={{ marginRight: 10 }}>로그인</Button>
            <Button type="primary">회원가입</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
