import "../css/writePost.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { writePostRequest } from "../redux/reducers/postReducer";

function WritePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const { category, folder } = params;

  const onSubmit = () => {
    if (title !== "" && content !== "") {
      dispatch(writePostRequest({ title, content, category, folder }));
      history.goBack();
    } else alert("제목 또는 내용을 입력하세요.");
  };

  return (
    <div className="writePostContainer">
      <input
        className="writePostTitle"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
        placeholder="제목"
      />
      <CKEditor
        editor={ClassicEditor}
        onBlur={(event, editor) => {
          setContent(editor.getData());
        }}
      />
      <button className="writePostButton" onClick={onSubmit}>
        글쓰기
      </button>
    </div>
  );
}

export default WritePost;
