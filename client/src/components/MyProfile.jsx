import MyButton from "./styledComponents/MyButton";
import { Avatar, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/myProfile.css";
import requestImg from "../util/requestImg";
import { useSelector } from "react-redux";
import {
  updateAccountRequest,
  withdrawalRequest,
} from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";

export default function MyProfile() {
  const account = useSelector((state) => state.authReducer.account);
  const [profileImage, setProfileImage] = useState(account.profile);
  const [name, setName] = useState(account.name);
  const [newPassword, setNewPassword] = useState();
  const [nameInputValue, setNameInputValue] = useState(account.name);
  const [PWInputValue, setPWInputValue] = useState("");
  const [nameUpdateShow, setNameUpdateShow] = useState(false);
  const [passwordUpdateShow, setPasswordUpdateShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  // 이미지 변경
  const insertImg = async (e) => {
    const { url } = await requestImg(e);
    setProfileImage(url);
  };

  const nameUpdateInput = (
    <input
      autoFocus={true}
      onChange={(e) => setNameInputValue(e.target.value)}
      value={nameInputValue}
      style={{ width: 100, color: "black" }}
    />
  );

  // 이름 변경 폼
  const nameUpdateConfirm = (
    <>
      <MyButton
        onClick={() => {
          setName(nameInputValue);
          setNameUpdateShow(false);
        }}
        text={"확인"}
      />
      <MyButton
        onClick={() => {
          setNameInputValue(name);
          setNameUpdateShow(false);
        }}
        text={"취소"}
      />
    </>
  );

  // 비밀번호 변경 폼
  const PWUpdateConfirm = (
    <>
      <input
        autoFocus={true}
        type="password"
        onChange={(e) => setPWInputValue(e.target.value)}
        value={PWInputValue}
        style={{ width: 100, color: "black" }}
      />
      <MyButton
        onClick={() => {
          setNewPassword(PWInputValue);
          setPasswordUpdateShow(false);
          setPWInputValue("");
        }}
        text={"확인"}
      />
      <MyButton
        onClick={() => {
          setPWInputValue("");
          setPasswordUpdateShow(false);
        }}
        text={"취소"}
      />
    </>
  );

  // 저장하기
  const updateSubmit = () => {
    dispatch(
      updateAccountRequest({
        name,
        profileImage,
        newPassword,
        email: account.email,
      })
    );
    history.push("/myProfile");
  };

  // 회원탈퇴
  const withdrawal = () => {
    dispatch(withdrawalRequest(account._id));
    history.push("/");
  };

  return (
    <div className="myProfileContainer">
      {/* 이미지 수정 */}
      <div className="profileImageContainer">
        <div className="profileImage">
          {profileImage ? (
            <img
              height="128"
              width="128"
              src={profileImage}
              alt="profileImage"
            />
          ) : (
            <Avatar size={128} icon={<UserOutlined />} />
          )}
        </div>
        <input
          id="inputId"
          onChange={(e) => insertImg(e)}
          accept="image/*"
          className="form-control"
          type="file"
        />
        <div className="imageUpdateDelete">
          <label htmlFor="inputId" className="imageUpdate">
            이미지 변경
          </label>
          <span onClick={() => setProfileImage("")} className="imageDelete">
            이미지 제거
          </span>
        </div>
      </div>

      {/* 이름 및 비밀번호 수정 */}
      <div className="nameAndPassword">
        <div className="profileName">
          {nameUpdateShow ? nameUpdateInput : name}
          <span className="nameUpdate">
            {nameUpdateShow ? (
              nameUpdateConfirm
            ) : (
              <span onClick={() => setNameUpdateShow(true)}>이름 변경</span>
            )}
          </span>
        </div>
        <div className="profilePassword">
          {passwordUpdateShow ? (
            PWUpdateConfirm
          ) : (
            <span
              onClick={() => setPasswordUpdateShow(true)}
              className="passwordUpdate"
            >
              비밀번호 변경
            </span>
          )}
        </div>

        {/* 저장 및 탈퇴 */}
        <div className="saveOrDelete">
          <Popconfirm
            title="정말 탈퇴하시겠습니까?"
            onConfirm={withdrawal}
            okText="네"
            cancelText="아니오"
          >
            <MyButton
              className={"deleteAccount"}
              color={"white"}
              backgroundColor={"red"}
              text={"회원 탈퇴"}
            />
          </Popconfirm>
          <MyButton
            className={"saveUpdate"}
            onClick={updateSubmit}
            text={"저장하기"}
          />
        </div>
      </div>
    </div>
  );
}
