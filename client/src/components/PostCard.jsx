import "../css/postcard.css";
import ReactHtmlParser from "react-html-parser";
import { Popconfirm, Space, message } from "antd";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import "../css/folder.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removePostRequest,
  loadDetailPostRequest,
} from "../redux/reducers/postReducer";
import { useHistory, useParams } from "react-router-dom";
import dateCalc from "../util/dateCalc";
import moment from "moment";

const PostCard = ({ post }) => {
  const account = useSelector((state) => state.authReducer.account);
  const history = useHistory();
  const dispatch = useDispatch();
  const { category, folder } = useParams();

  // post 삭제 알림창
  const confirm = (id) => {
    dispatch(removePostRequest(id)); // _id 와 id 다름
    message.success({
      content: "게시물을 삭제하였습니다.",
      style: {
        marginTop: "9vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
  };

  // post 열기
  const goDetailPost = (postId) => {
    dispatch(loadDetailPostRequest(postId));
    history.push(`/${category}/${folder}/${postId}`);
  };

  return (
    <>
      <div className="postContainer" key={post.id}>
        <div onClick={() => goDetailPost(post.id)} className="post">
          <div className="notFileUrl">
            <div className="postTitle">{post.title}</div>
            <div className="postContent">{ReactHtmlParser(post.content)}</div>
            <div className="commentsAndDate">
              {post.comments ? (
                <Space>
                  <MessageOutlined />
                  {post.comments.length}
                </Space>
              ) : null}
              <Space className="postDate">
                {dateCalc(moment(), post.date)}
              </Space>
            </div>
          </div>
          <div className="fileUrl">
            <img src={post.fileUrl} alt="" />
          </div>
        </div>
        {account && account.role === "host" ? (
          <Popconfirm
            title="정말 삭제하시겠습니까?"
            onConfirm={() => {
              confirm(post.id);
            }}
            okText="네"
            cancelText="아니오"
          >
            <CloseOutlined className="postCloseIcon" />
          </Popconfirm>
        ) : null}
      </div>
    </>
  );
};

export default PostCard;
