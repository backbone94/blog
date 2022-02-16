import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {
  loadFolderListRequest,
  addFolderRequest,
  removeFolderRequest,
} from "../redux/reducers/folderReducer";
import { Link, useParams } from "react-router-dom";
import { Modal, Alert, Button, Input } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "../css/category.css";

export default function Category() {
  const emptyUrl =
    "https://my-blog1684.s3.ap-northeast-2.amazonaws.com/upload/empty.ico";
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const folderList = useSelector((state) => state.folderReducer.folderList);
  const error = useSelector((state) => state.folderReducer.error);
  const loading = useSelector((state) => state.folderReducer.loading);
  const dispatch = useDispatch();
  const params = useParams();
  const category = params.category;

  // Folder List 불러오기
  useEffect(() => {
    dispatch(loadFolderListRequest(category));
  }, [dispatch, category]);

  // Modal Ok 버튼
  const handleOk = () => {
    if (title !== "" && fileUrl !== "") {
      dispatch(addFolderRequest({ title, fileUrl, category }));
      setTitle("");
      setFileUrl("");
      setIsModalVisible(false);
    } else if (fileUrl === "") alert("Enter the Image!");
    else if (title === "") alert("Enter the Folder name!");
  };

  // Modal cancel 버튼
  const handleCancel = () => {
    setTitle("");
    setFileUrl("");
    setIsModalVisible(false);
  };

  // Folder 이미지를 s3에 저장하고 이미지 경로 가져오기
  const requestImg = async (e) => {
    const formData = new FormData();
    formData.append("upload", e.target.files[0]);
    try {
      const result = await axios.post(
        "http://localhost:7000/api/folder/image",
        formData
      );
      setFileUrl(result.data.url[0]);

      // 이미지 경로에서 정규표현식을 활용하여 카테고리 제목 찾아내기
      const temp = result.data.url[0]
        .match(/(?<=upload\/).{1,}(?=.ico)/)[0]
        .match(/[a-zA-Z]/g)
        .join("");
      setTitle(temp);
    } catch (e) {
      console.log(e);
      alert("server error");
    }
  };

  // Folder 삭제
  const removeFolder = (id) => {
    dispatch(removeFolderRequest(id));
  };

  return (
    <>
      {/* error 값이 존재하면 Alert 창 띄우기 */}
      {error && (
        <Alert
          className="dupAlert"
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
        />
      )}
      {/* Folder List 불러오기 */}
      {loading ? (
        <Loading />
      ) : (
        <div className="category">
          <div className="folderList">
            {folderList.map((folder) => (
              <div key={folder.id} className="folderElement">
                <div className="removeIcon">
                  <CloseOutlined onClick={() => removeFolder(folder.id)} />
                </div>
                <Link to={`/${category}/${folder.title}`}>
                  <img
                    className="folderImg"
                    alt={`${folder.title}`}
                    src={folder.fileUrl}
                  />
                </Link>
                <div className="folderText">{folder.title}</div>
              </div>
            ))}
          </div>

          {/* 카테고리 추가 버튼 */}
          <div className="addFolder">
            <div
              className="addFolderButton"
              onClick={() => setIsModalVisible(true)}
            >
              <div className="plus">
                <PlusOutlined className="plusIcon" />
                <div className="plusText">Add Folder</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
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
                onChange={requestImg}
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
    </>
  );
}
