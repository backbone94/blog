import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
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

export default function More() {
  const [isMore, setIsMore] = useState(false);
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
    history.push("/");
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

  const menu = (
    <Menu
      style={{
        textAlign: "center",
        fontFamily: '"Gamja Flower", cursive',
      }}
    >
      <Menu.Item style={{ marginBottom: 10 }} key="0">
        <div onClick={goSearchPage}>
          <SearchOutlined />
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item style={{ marginBottom: 10 }} key="1">
        <MyButton onClick={() => setIsLogIn(true)} text={"로그인"} />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Button
          onClick={() => setIsSignUp(true)}
          style={{ borderRadius: "10%" }}
          type="primary"
        >
          회원가입
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="more">
      {!account ? (
        <Dropdown
          placement="bottomRight"
          arrow
          overlay={menu}
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      ) : null}
      {isMore ? <More /> : null}
      {/* 로그인 */}
      <LogIn isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
      {/* 회원가입 */}
      <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </div>
  );
}
