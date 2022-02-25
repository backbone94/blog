import { addFolderRequest } from "../redux/reducers/folderReducer";
import { Modal, Button, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import requestImg from "../util/requestImg";

const AddFolder = ({ setIsModalVisible, isModalVisible, category }) => {
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const emptyUrl =
    "https://my-blog1684.s3.ap-northeast-2.amazonaws.com/upload/empty.ico";
  const dispatch = useDispatch();

  // Modal Ok 버튼
  const handleOk = () => {
    if (title !== "" && fileUrl !== "") {
      dispatch(addFolderRequest({ title, fileUrl, category }));
      setTitle("");
      setFileUrl("");
      setIsModalVisible(false);
    } else if (fileUrl === "")
      message.error({
        content: "이미지를 선택하세요.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
    else if (title === "")
      message.error({
        content: "폴더명을 적으세요.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
  };

  // Modal cancel 버튼
  const handleCancel = () => {
    setTitle("");
    setFileUrl("");
    setIsModalVisible(false);
  };

  // 폴더 이미지 삽입하기
  const insertImg = async (e) => {
    const { url, regExp } = await requestImg(e);
    console.log("url: ", url);
    setFileUrl(url);
    setTitle(regExp);
  };

  return (
    <Modal
      style={{ fontFamily: '"Gamja Flower", cursive' }}
      title="Add Folder"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="addFolderForm">
        {/* Modal의 Image 부분 */}
        {fileUrl ? (
          <img src={fileUrl} alt="img" />
        ) : (
          <div>
            <label className="mb-2">Image</label>
            <input
              onChange={(e) => insertImg(e)}
              accept="image/*"
              className="form-control"
              type="file"
            />
            <Button onClick={() => setFileUrl(emptyUrl)} className="mt-2">
              기본 이미지로 설정
            </Button>
          </div>
        )}
        {/* Modal의 title  부분 */}
        <div>
          <label className="mt-3 mb-2">Title</label>
          <Input
            placeholder="Enter the Folder Title"
            style={{ display: "block", width: "100%" }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddFolder;
