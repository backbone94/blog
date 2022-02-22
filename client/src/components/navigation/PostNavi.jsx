import { Link } from "react-router-dom";
import "../../css/navigation.css";

const PostNavi = ({ navi }) => {
  const { category, folder, post } = navi;

  return (
    <div className="navigationContainer">
      <div className="navigation">
        <Link className="linkNavi" to={`/${category}`}>
          {category}
        </Link>
        <span> / </span>
        <Link className="linkNavi" to={`/${category}/${folder}`}>
          {folder}
        </Link>
        <span> / </span>
        <span>{post}</span>
      </div>
    </div>
  );
};

export default PostNavi;
