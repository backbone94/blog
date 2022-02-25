import "../css/writePost.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updatePostRequest } from "../redux/reducers/postReducer";
import { message } from "antd";
import Loading from "./loading/CategoryLoading";
import MyButton from "./styledComponents/MyButton";

export default function UpdatePost() {
  const history = useHistory();
  const post = useSelector((state) => state.postReducer.post);
  const loading = useSelector((state) => state.postReducer.loading);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const params = useParams();
  const { category, folder } = params;

  const onSubmit = () => {
    if (title !== "" && content !== "") {
      dispatch(updatePostRequest({ id: post.id, title, content }));
      history.push(`/${category}/${folder}/${post.id}`);

      message.success({
        content: "게시물을 수정하였습니다.",
        style: {
          marginTop: "10vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
    } else alert("제목 또는 내용을 입력하세요.");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="writePostContainer">
          <input
            autoFocus
            className="writePostTitle"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            value={title}
            placeholder="제목"
          />
          <CKEditor
            editor={ClassicEditor}
            onReady={(editor) => {
              editor.setData(post.content);
            }}
            onBlur={(event, editor) => {
              setContent(editor.getData());
            }}
          />
          <MyButton
            className="writePostButton"
            text={"수정하기"}
            onClick={onSubmit}
          />
        </div>
      )}
    </>
  );
}
