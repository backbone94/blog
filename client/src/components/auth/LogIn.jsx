import { Modal, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logInRequest } from "../../redux/reducers/authReducer";

export default function LogIn({ isLogIn, setIsLogIn }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  // 칸이 비어 있을 경우
  const warning = (field) => {
    message.error({
      content: `${field} 칸을 입력해주세요.`,
      style: {
        marginTop: "10vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
  };

  const handleOk = () => {
    if (!email) {
      warning("이메일");
      return;
    } else if (!password) {
      warning("비밀번호");
      return;
    } else {
      dispatch(logInRequest({ email, password }));

      setEmail("");
      setPassword("");
      setIsLogIn(false);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setIsLogIn(false);
  };

  return (
    <Modal
      width={350}
      autoFocus={false}
      style={{ fontFamily: '"Gamja Flower", cursive' }}
      title="로그인"
      visible={isLogIn}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <Input
          autoFocus={true}
          placeholder="이메일"
          prefix={<UserOutlined />}
          className="mb-3"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
        />
        <Input
          placeholder="비밀번호"
          prefix={<LockOutlined />}
          className="mb-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </div>
    </Modal>
  );
}
