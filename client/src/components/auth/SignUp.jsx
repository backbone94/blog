import { Modal, Input, message } from "antd";
import { LockOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccountRequest } from "../../redux/reducers/authReducer";

export default function SignUp({ isSignUp, setIsSignUp }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
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
    if (passwordConfirm && password !== passwordConfirm) {
      // 비밀번호 일치하지 않는 경우
      message.error({
        content: "비밀번호가 일치하지 않습니다.",
        style: {
          marginTop: "10vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      return;
    }

    if (!name) {
      warning("이름");
      return;
    } else if (!email) {
      warning("이메일");
      return;
    } else if (!password || !passwordConfirm) {
      warning("비밀번호");
      return;
    } else {
      dispatch(createAccountRequest({ name, email, password }));

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setIsSignUp(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setIsSignUp(false);
  };

  return (
    <Modal
      width={350}
      autoFocus={false}
      style={{ fontFamily: '"Gamja Flower", cursive' }}
      title="회원가입"
      visible={isSignUp}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <label>이름</label>
        <Input
          autoFocus={true}
          className="mb-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
        />
        <label>이메일</label>
        <Input
          className="mb-2"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
        />
        <label>비밀번호</label>
        <Input
          suffix={<LockOutlined />}
          className="mb-2"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <label>비밀번호 확인</label>
        <Input
          suffix={<CheckCircleOutlined />}
          className="mb-2"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          type="password"
        />
      </div>
    </Modal>
  );
}
