import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { loadPostListRequest } from "../redux/reducers/postReducer";
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
    if (postList) return;
    dispatch(loadPostListRequest({ category, folder }));
  }, [dispatch, category, folder, postList]);

  return (
    <div>
      {loading ? (
        <CategoryLoading />
      ) : (
        <div className="folderContainer">
          <FolderNavi navi={{ category, folder }} /> {/* 네비게이션 */}
          <div className="folderName">{folder}</div>
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
              <div className="noPostContainer">
                <h2 className="noPost">글이 없습니다.</h2>
              </div>
            ) : (
              postList
                .slice("")
                .reverse()
                .map((post) => <PostCard post={post} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
