import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { loadPostListRequest } from "../redux/reducers/postReducer";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "../css/folder.css";
import CategoryLoading from "./loading/CategoryLoading";
import FolderNavi from "./navigation/FolderNavi";
import PostCard from "./PostCard";

const Folder = () => {
  const loading = useSelector((state) => state.postReducer.loading);
  const postList = useSelector((state) => state.postReducer.postList);
  const dispatch = useDispatch();
  const params = useParams();
  const { category, folder } = params;

  useEffect(() => {
    dispatch(loadPostListRequest({ category, folder }));
  }, [dispatch, category, folder]);

  return (
    <div>
      {loading ? (
        <CategoryLoading />
      ) : (
        <div className="realEntire">
          <FolderNavi navi={{ category, folder }} /> {/* 네비게이션 */}
          <div className="folderName">{folder}</div>
          <div className="entireContainer">
            {/* post 추가 버튼 */}
            <div className="addPost">
              <Link to={`/${category}/${folder}/WritePost`}>
                <Button icon={<PlusCircleOutlined />} type="dashed">
                  Add Post
                </Button>
              </Link>
            </div>
            <div className="postListContainer">
              {postList.length === 0 ? (
                <h1
                  style={{
                    textAlign: "center",
                    margin: 50,
                    fontFamily: "Gamja Flower, cursive",
                  }}
                >
                  글이 없습니다.
                </h1>
              ) : (
                postList
                  .slice("")
                  .reverse()
                  .map((post) => <PostCard post={post} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
