import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Popconfirm, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { removePostRequest } from "../redux/reducers/postReducer";

const SearchPost = () => {
  const postList = useSelector((state) => state.postReducer.postList);
  const dispatch = useDispatch();

  // 카테고리 삭제 confirm 창
  const confirm = (id) => {
    dispatch(removePostRequest(id)); // _id 와 id 다름
    message.success("삭제되었습니다.");
  };

  return (
    <div>
      {postList.length === 0 ? (
        <h1>글이 없습니다.</h1>
      ) : (
        postList.map((post) => {
          return (
            <div className="postContainer" key={post.id}>
              <div className="post">
                <h2 className="postTitle">{post.title}</h2>
                <div className="postContent">
                  {ReactHtmlParser(post.content)}
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
          );
        })
      )}
    </div>
  );
};

export default SearchPost;
