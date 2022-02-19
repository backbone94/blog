import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import "../css/searchPost.css";

const SearchPost = () => {
  const postList = useSelector((state) => state.postReducer.postList);

  return (
    <>
      {postList.length === 0 ? (
        <div className="noSearchPost">
          <h1 className="noSearchPostText">검색 결과가 없습니다.</h1>
        </div>
      ) : (
        <>
          <div style={{ textAlign: "center", fontSize: 30, margin: 30 }}>
            검색 결과
          </div>
          <div className="yesSearchPost">
            {postList.map((post) => {
              return <PostCard post={post} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default SearchPost;
