import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "./styledComponents/MyButton";
import { Input, message, Popconfirm } from "antd";
import moment from "moment";
import dateCalc from "../util/dateCalc";
import {
  createCommentRequest,
  deleteCommentRequest,
} from "../redux/reducers/commentReducer";
import "../css/comment.css";

const { TextArea } = Input;

export default function Comment() {
  const post = useSelector((state) => state.postReducer.post);
  const account = useSelector((state) => state.authReducer.account);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const errorMsg = (msg) => {
    message.error({
      content: msg,
      style: {
        marginTop: "12vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
  };

  const commentSubmit = () => {
    if (inputValue === "") errorMsg("댓글을 작성하세요.");
    if (account === null) {
      errorMsg("로그인이 필요합니다.");
    } else {
      dispatch(
        createCommentRequest({
          content: inputValue,
          post,
          creator: account._id,
        })
      );
    }
    setInputValue("");
  };

  const deleteComment = (postId, commentId) => {
    dispatch(deleteCommentRequest({ postId, commentId }));
  };

  return (
    <div className="commentcontainer">
      <div className="commentslength">
        {post.comments && post.comments.length} 개의 댓글
      </div>
      <div className="commentInput">
        <TextArea
          disabled={account ? false : true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={account ? "댓글을 작성하세요." : "로그인이 필요합니다."}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
      <div className="commentSubmit">
        <MyButton onClick={commentSubmit} text={"작성하기"} />
      </div>
      <div className="commentList">
        {post.comments &&
          post.comments.map((comment, index) => (
            // comment card
            <div key={comment.id}>
              <div className="commentInfo">
                <div className="imageOfComment">
                  <img
                    src={comment.creator.profile}
                    alt="profile"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="commentCreator">
                  <div className="commentName">{comment.creator.name}</div>
                  <div className="commentDate">
                    {dateCalc(moment(), comment.date)}
                  </div>
                </div>
                <div className="commentUpdateOrDelete">
                  {/* <div className="commentUpdate">수정</div> */}
                  <Popconfirm
                    title="정말 삭제하시겠습니까?"
                    onConfirm={() => deleteComment(post.id, comment._id)}
                    okText="네"
                    cancelText="아니오"
                  >
                    <div className="commentDelete">삭제</div>
                  </Popconfirm>
                </div>
              </div>
              <div className="commentContent">
                {comment.content.split("\n").map((line) => {
                  return (
                    <span>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </div>
              {index !== post.comments.length - 1 ? <hr /> : null}
            </div>
          ))}
      </div>
    </div>
  );
}
