import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadPostListRequest,
  removePostRequest,
} from "../redux/reducers/postReducer";
import ReactHtmlParser from "react-html-parser";
import { CloseOutlined } from "@ant-design/icons";
import "../css/folder.css";
import Loading from "./Loading";

const Folder = () => {
  const loading = useSelector((state) => state.postReducer.loading);
  const postList = useSelector((state) => state.postReducer.postList);
  const dispatch = useDispatch();
  const params = useParams();
  const { category, folder } = params;

  useEffect(() => {
    dispatch(loadPostListRequest({ category, folder }));
  }, [dispatch, category, folder]);

  const removePost = (id) => {
    dispatch(removePostRequest(id)); // _id 와 id 다름
  };

  return (
    <div>
      {loading ? (
        <Loading />
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
                      <CloseOutlined
                        onClick={() => removePost(post.id)}
                        className="closeIcon"
                      />
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
