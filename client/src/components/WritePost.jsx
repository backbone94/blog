import "../css/writePost.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { writePostRequest } from "../redux/reducers/postReducer";
import { message } from "antd";
import MyButton from "./styledComponents/MyButton";
import { useSelector } from "react-redux";
// import { editorConfiguration } from "../util/editor/editorConfig";
// import MyCustomUploadAdapterPlugin from "../util/editor/uploadAdapter";

function WritePost() {
  const creator = useSelector((state) => state.authReducer.account);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const { category, folder } = params;

  const onSubmit = () => {
    if (title !== "" && content !== "") {
      dispatch(writePostRequest({ title, content, category, folder, creator }));
      history.replace(`/${category}/${folder}`);

      message.success({
        content: "게시물을 추가하였습니다.",
        style: {
          marginTop: "9vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
    } else alert("제목 또는 내용을 입력하세요.");
  };

  return (
    <div className="writePostContainer">
      <input
        autoFocus
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
      <MyButton
        className="writePostButton"
        text={"글쓰기"}
        onClick={onSubmit}
      />
    </div>
  );
}

export default WritePost;
