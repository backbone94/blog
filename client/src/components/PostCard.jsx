import "../css/postcard.css";
import ReactHtmlParser from "react-html-parser";
import { Popconfirm, Space, message } from "antd";
import { CloseOutlined, MessageOutlined } from "@ant-design/icons";
import "../css/folder.css";
import { useDispatch } from "react-redux";
import { removePostRequest } from "../redux/reducers/postReducer";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();

  // post 삭제 알림창
  const confirm = (id) => {
    dispatch(removePostRequest(id)); // _id 와 id 다름
    message.success("게시글을 삭제하였습니다.");
  };

  return (
    <>
      <div className="postContainer" key={post.id}>
        <div className="post">
          <div className="notFileUrl">
            <h2 className="postTitle">{post.title}</h2>
            <div className="postContent">{ReactHtmlParser(post.content)}</div>
            <div className="commentsAndDate">
              {post.comments ? (
                <Space>
                  <MessageOutlined />
                  {post.comments.length}
                </Space>
              ) : null}
              <Space className="postDate">{post.date}</Space>
            </div>
          </div>
          <div className="fileUrl">
            <img src={`${post.fileUrl}`} alt="" />
          </div>
        </div>
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
      </div>
    </>
  );
};

export default PostCard;
