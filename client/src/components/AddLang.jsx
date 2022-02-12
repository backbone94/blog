import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { imageUploading } from "../redux/reducers/postReducer";

axios.defaults.withCredentials = true;

function AddLang({ event }) {
  const [text, setText] = useState("");
  let [url, setUrl] = useState("");
  const dispatch = useDispatch();

  async function onSubmit(e) {
    e.preventDefault();
    console.log("url:", url, "text:", text);

    dispatch(imageUploading({ url, text }));
    event();
    console.log("액션 전달 완료");
  }

  async function requestImg(e) {
    const formData = new FormData();
    formData.append("upload", e.target.files[0]);
    try {
      const result = await axios.post(
        "http://localhost:7000/api/post/image",
        formData
      );
      setUrl(result.data.url[0]);
    } catch (e) {
      console.log(e);
      alert("server error");
    }
  }

  return (
    <div className="addLangForm">
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          사진을 고르세요.
        </label>
        <input
          onChange={requestImg}
          accept="image/*"
          className="form-control"
          type="file"
          id="formFile"
        />
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            언어
          </label>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          추가하기
        </button>
      </form>
    </div>
  );
}

export default AddLang;
