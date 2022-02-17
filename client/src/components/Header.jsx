import "../css/header.css";
import { useHistory } from "react-router-dom";
import { Input, Button, Popconfirm, notification, message } from "antd";
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import {
  addCategoryRequest,
  loadCategoryListRequest,
  removeCategoryRequest,
} from "../redux/reducers/categoryReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = () => {
  const { Search } = Input;
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

  // 검색 기능
  const onSearch = (e) => {
    console.log(e);
  };

  // 카테고리 삭제 confirm 창
  const confirm = (id) => {
    dispatch(removeCategoryRequest(id));
    message.success("삭제되었습니다.");
  };

  // 카테고리 추가
  const addCategory = () => {
    dispatch(addCategoryRequest(title));

    // error 값이 존재하면 Alert 창 띄우기
    if (error) {
      notification["error"]({
        message: "에러",
        description: `${error}`,
      });

      dispatch({ type: "CLEAR_ERROR_REQUEST" });
    }

    setAdd(false);
    setTitle("");
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
        <Loading />
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
                <Button onClick={addCategory}>추가</Button>
              </div>
            )}
          </div>

          {/* 검색, 로그인, 회원가입 부분*/}
          <div className="searchAndLogin">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 200, marginRight: 10 }}
            />
            <Button style={{ marginRight: 10 }}>로그인</Button>
            <Button type="primary">회원가입</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
