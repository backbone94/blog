import { Link } from "react-router-dom";
import "../../css/navigation.css";

const PostNavi = ({ navi }) => {
  const { category, folder, title } = navi;

  return (
    <div className="navigationContainer">
      <div className="navigation">
        <Link className="linkNavi" to={`/${category}`}>
          {category}
        </Link>
        <span> / </span>
        <Link className="linkNavi" to={`/${category}`}>
          {folder}
        </Link>
        <span> / </span>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default PostNavi;
