import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import {
  clearPostListSuccess,
  clearPostListFailure,
} from "../redux/reducers/postReducer";
import MyButton from "./styledComponents/MyButton";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    <div className="searchAndLogin">
      <div onClick={goSearchPage} className="searchIcon">
        <SearchOutlined />
      </div>
      <MyButton text={"로그인"} marginRight={10} />
      <Button style={{ borderRadius: "10%" }} type="primary">
        회원가입
      </Button>
    </div>
  );
};

export default HeaderRight;
