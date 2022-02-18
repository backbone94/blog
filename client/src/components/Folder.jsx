import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  loadPostListRequest,
  removePostRequest,
} from "../redux/reducers/postReducer";
import ReactHtmlParser from "react-html-parser";
import { Popconfirm, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../css/folder.css";
import CategoryLoading from "./loading/CategoryLoading";

const Folder = () => {
  const loading = useSelector((state) => state.postReducer.loading);
  const postList = useSelector((state) => state.postReducer.postList);
  const dispatch = useDispatch();
  const params = useParams();
  const { category, folder } = params;

  useEffect(() => {
    dispatch(loadPostListRequest({ category, folder }));
  }, [dispatch, category, folder]);

  // post 삭제 알림창
  const confirm = (id) => {
    dispatch(removePostRequest(id)); // _id 와 id 다름
    message.success("게시글을 삭제하였습니다.");
  };

  return (
    <div>
      {loading ? (
        <CategoryLoading />
      ) : (
        <div className="realEntire">
          <div className="entireContainer">
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
            <Link to={`/${category}/${folder}/WritePost`}>
              <button>글쓰기</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
