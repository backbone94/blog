import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import {
  loadLangListRequest,
  addLangRequest,
} from "../../redux/reducers/langReducer";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Button, Alert } from "antd";
import "../../css/language.css";

export default function Language() {
  const emptyUrl =
    "https://my-blog1684.s3.ap-northeast-2.amazonaws.com/upload/empty.ico";
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lang = useSelector((state) => state.langReducer.lang);
  const loading = useSelector((state) => state.langReducer.loading);
  const error = useSelector((state) => state.langReducer.error);
  const dispatch = useDispatch();
  console.log(error);
  // 카테고리 불러오기
  useEffect(() => {
    dispatch(loadLangListRequest());
  }, [dispatch]);

  // Modal Ok 버튼
  const handleOk = () => {
    if (title !== "" && fileUrl !== "") {
      dispatch(addLangRequest({ title, fileUrl }));
      setTitle("");
      setFileUrl("");
      setIsModalVisible(false);
    } else if (fileUrl === "") alert("Enter the Image!");
    else if (title === "") alert("Enter the Category!");
  };

  // Modal cancel 버튼
  const handleCancel = () => {
    setTitle("");
    setFileUrl("");
    setIsModalVisible(false);
  };

  // 이미지를 s3에 저장하고 이미지 경로 가져오기
  async function requestImg(e) {
    const formData = new FormData();
    formData.append("upload", e.target.files[0]);
    try {
      const result = await axios.post(
        "http://localhost:7000/api/langCategory/image",
        formData
      );
      setFileUrl(result.data.url[0]);
      console.log(typeof result.data.url[0]);

      // 이미지 경로에서 정규표현식을 활용하여 카테고리 제목 찾아내기
      const temp = result.data.url[0]
        .match(/(?<=upload\/).{1,}(?=.ico)/)[0]
        .match(/[a-zA-Z]/g)
        .join("");
      console.log("temp: ", temp);
      setTitle(temp);
    } catch (e) {
      console.log(e);
      alert("server error");
    }
  }

  return (
    <>
      {/* Lang List 불러오기 */}
      {loading ? (
        <Loading />
      ) : (
        <div className="lang">
          {/* error가 있다면 antd Alert 창 불러오기 */}
          {error && (
            <Alert
              className="dupAlert"
              closable
              message="Error"
              description={error}
              type="error"
              showIcon
            />
          )}
          <div className="langElements">
            {lang.map((l) => {
              return (
                <div key={l.title}>
                  <Link to={`/Lang/${l.title}`}>
                    <img
                      className="langElement"
                      alt={`${l.title}`}
                      src={l.fileUrl}
                    />
                  </Link>
                  <div className="langText">{l.title}</div>
                </div>
              );
            })}
          </div>

          {/* Lang 카테고리 추가 버튼 */}
          <div className="addLang">
            <div
              className="addLangButton"
              onClick={() => setIsModalVisible(true)}
            >
              <div className="plus">
                <PlusOutlined className="plusIcon" />
                <div className="plusText">Add Category</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      <Modal
        title="Add Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="addLangForm">
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
          {/* Modal의 Category 부분 */}
          <div>
            <label className="mt-3 mb-2">Category</label>
            <Input
              placeholder="Enter the Category"
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
