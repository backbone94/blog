import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../css/folder.css";
import CategoryLoading from "./loading/CategoryLoading";
import FolderNavi from "./navigation/FolderNavi";
import PostCard from "./PostCard";
import MyButton from "./styledComponents/MyButton";

const Folder = () => {
  const loading = useSelector((state) => state.postReducer.loading);
  const postList = useSelector((state) => state.postReducer.postList);
  const params = useParams();
  const { category, folder } = params;

  return (
    <div>
      {loading ? (
        <CategoryLoading />
      ) : (
        <div className="folderContainer">
          <FolderNavi navi={{ category, folder }} /> {/* 네비게이션 */}
          <div className="folderName">{folder}</div>
          <div className="postListContainer">
            {/* post가 없는 경우 */}
            {postList.length === 0 ? (
              <div className="noPostContainer">
                <div className="addPost">
                  <Link to={`/${category}/${folder}/WritePost`}>
                    <MyButton text={"Add Post"} />
                  </Link>
                </div>
                <h2 className="noPost">글이 없습니다.</h2>
              </div>
            ) : (
              <>
                {/* post가 있는 경우 */}
                <div className="addPost">
                  <Link to={`/${category}/${folder}/WritePost`}>
                    <MyButton text={"Add Post"} />
                  </Link>
                </div>
                {postList
                  .slice("")
                  .reverse()
                  .map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
