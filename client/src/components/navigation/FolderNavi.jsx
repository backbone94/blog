import { Link } from "react-router-dom";
import "../../css/navigation.css";

const FolderNavi = ({ navi }) => {
  const { category, folder } = navi;

  return (
    <div className="navigationContainer">
      <div className="navigation">
        <Link className="linkNavi" to={`/${category}`}>
          {category}
        </Link>
        <span> / </span>
        <span>{folder}</span>
      </div>
    </div>
  );
};

export default FolderNavi;
