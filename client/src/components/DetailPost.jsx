import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import "../css/detailPost.css";

const DetailPost = () => {
  const post = useSelector((state) => state.postReducer.post);

  console.log("post: ", post);

  return (
    <div className="detailPostContainer">
      <div className="detailPostTitle">
        <h2>{post.title}</h2>
      </div>
      <div className="detailPostContent">{ReactHtmlParser(post.content)}</div>
    </div>
  );
};

export default DetailPost;
