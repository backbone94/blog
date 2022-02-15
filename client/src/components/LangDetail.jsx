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
import "../css/post.css";
import Loading from "../components/Loading";

export default function LangDetail() {
  const loading = useSelector((state) => state.postReducer.loading);
  console.log("loading :", loading);
  const posts = useSelector((state) => state.postReducer.posts);
  const dispatch = useDispatch();
  const params = useParams();
  const parameter = params.id;

  useEffect(() => {
    console.log("useEffect 실행됨");
    dispatch(loadPostListRequest(parameter));
  }, [dispatch, parameter]);

  const removePost = (postId) => {
    dispatch(removePostRequest(postId));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="realEntire">
          <div className="entireContainer">
            <div>
              {posts.length === 0 ? (
                <h1>글이 없습니다.</h1>
              ) : (
                posts.map((post) => {
                  return (
                    <div className="postContainer" key={post._id}>
                      <div className="post">
                        <h2 className="postTitle">{post.title}</h2>
                        <div className="postContent">
                          {ReactHtmlParser(post.content)}
                        </div>
                      </div>
                      <CloseOutlined
                        onClick={() => removePost(post._id)}
                        className="closeIcon"
                      />
                    </div>
                  );
                })
              )}
            </div>
            <Link to={`/Lang/${params.id}/WritePost`}>
              <button>글쓰기</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
