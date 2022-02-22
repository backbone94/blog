import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchPostRequest } from "../redux/reducers/postReducer";
import PostCard from "./PostCard";
import "../css/searchPost.css";
import { CloseOutlined } from "@ant-design/icons";

const SearchPost = () => {
  const inputRef = useRef();
  const postList = useSelector((state) => state.postReducer.postList);
  const [searchWord, setSearchWord] = useState("");
  const dispatch = useDispatch();

  const onSearch = (e) => {
    setSearchWord(e.target.value);
    dispatch(searchPostRequest(e.target.value));
  };

  const clearSearch = () => {
    setSearchWord("");
    inputRef.current.focus();
  };

  return (
    <>
      <div className="searchInputContainer">
        <input
          ref={inputRef}
          autoFocus
          className="searchInput"
          placeholder="게시글 제목으로 검색"
          onChange={onSearch}
          value={searchWord}
        />
        {searchWord ? (
          <CloseOutlined onClick={clearSearch} className="clearInputIcon" />
        ) : null}
      </div>
      {postList.length === 0 || !searchWord ? (
        <div className="noSearchPost">
          <h2 className="noSearchPostText">검색 결과가 없습니다.</h2>
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
