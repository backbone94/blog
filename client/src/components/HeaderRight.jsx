import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, notification, Avatar, Dropdown, Menu, message } from "antd";
import {
  clearPostListSuccess,
  clearPostListFailure,
} from "../redux/reducers/postReducer";
import { logOutSuccess, logOutFailure } from "../redux/reducers/authReducer";
import MyButton from "./styledComponents/MyButton";
import SignUp from "./auth/SignUp";
import { useSelector } from "react-redux";
import LogIn from "./auth/LogIn";
import "../css/avatar.css";

const HeaderRight = () => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { error, account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

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

  // 로그아웃
  const logOut = () => {
    try {
      dispatch(logOutSuccess());
      message.success({
        content: "로그아웃 하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
    } catch (e) {
      console.log(e);
      dispatch(logOutFailure());
    }
  };

  // 프로필로 이동
  const myProfile = () => {
    history.push("/myProfile");
  };

  // 프로필 dropdown
  const profile = (
    <Menu style={{ fontFamily: '"Gamja Flower", cursive' }}>
      <Menu.Item onClick={myProfile} key="0">
        내 프로필
      </Menu.Item>
      <Menu.Item onClick={logOut} key="1">
        <span style={{ color: "red" }}>로그아웃</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="searchAndLogin">
      <div onClick={goSearchPage} className="searchIcon">
        <SearchOutlined />
      </div>
      {account && account ? (
        <>
          <Dropdown overlay={profile} trigger={["click"]}>
            <Avatar className="avatar" src={account.profile} />
          </Dropdown>
          <span style={{ marginLeft: 5 }}>{account.name}</span>
        </>
      ) : (
        <>
          <MyButton
            onClick={() => setIsLogIn(true)}
            text={"로그인"}
            marginRight={10}
          />
          <Button
            onClick={() => setIsSignUp(true)}
            style={{ borderRadius: "10%" }}
            type="primary"
          >
            회원가입
          </Button>
        </>
      )}

      {/* 로그인 */}
      <LogIn isLogIn={isLogIn} setIsLogIn={setIsLogIn} />

      {/* 회원가입 */}
      <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </div>
  );
};

export default HeaderRight;
