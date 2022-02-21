import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { tz } from "moment-timezone";
import "../css/detailPost.css";
import { useHistory, useParams } from "react-router-dom";
import { removePostRequest } from "../redux/reducers/postReducer";
import Loading from "./loading/CategoryLoading";
import { message, Popconfirm } from "antd";

const DetailPost = () => {
  const post = useSelector((state) => state.postReducer.post);
  const loading = useSelector((state) => state.postReducer.loading);
  console.log("post.date: ", post.date);
  const date = tz(post.date, "Asia/Seoul").format("YY.MM.DD. HH:mm");
  const history = useHistory();
  const dispatch = useDispatch();
  const { category, folder } = useParams();

  const update = () => {
    history.push(`/${category}/${folder}/UpdatePost`);
  };

  const remove = () => {
    dispatch(removePostRequest(post.id)); // _id 와 id 다름
    message.success({
      content: "게시물을 삭제하였습니다.",
      style: {
        marginTop: "9vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
    history.push(`/${category}/${folder}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="detailPostContainer">
          <div className="detailPostTitle">{post.title}</div>
          <div className="dateAndUpdate">
            <span className="detailPostDate">{date}</span>
            <span className="detailPostUpdate" onClick={update}>
              수정
            </span>
            <Popconfirm
              title="정말 삭제하시겠습니까?"
              onConfirm={() => {
                remove(folder.id, folder.title);
              }}
              okText="네"
              cancelText="아니오"
            >
              <span className="detailPostRemove">삭제</span>
            </Popconfirm>
          </div>
          <div className="detailPostContent">
            {ReactHtmlParser(post.content)}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPost;
