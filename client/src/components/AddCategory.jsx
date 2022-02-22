import { message } from "antd";
import MyButton from "./styledComponents/MyButton";
import { addCategoryRequest } from "../redux/reducers/categoryReducer";
import { loadFolderListRequest } from "../redux/reducers/folderReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AddCategory = ({ add, setAdd, title, setTitle }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 카테고리 추가
  const addCategory = () => {
    if (!title) {
      message.error({
        content: "카테고리 이름을 입력하세요.",
        style: {
          marginTop: "10vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
    } else {
      dispatch(addCategoryRequest(title));
      dispatch(loadFolderListRequest(title));
      setAdd(false);
      setTitle("");
      history.replace(`/${title}`);
    }
  };

  return (
    <>
      {!add ? (
        <MyButton text={"Add Category"} onClick={() => setAdd(true)}></MyButton>
      ) : (
        <div>
          <input
            style={{ color: "black" }}
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <MyButton text={"추가"} marginLeft={5} onClick={addCategory} />
          <MyButton
            text={"취소"}
            marginLeft={5}
            onClick={() => setAdd(false)}
          />
        </div>
      )}
    </>
  );
};

export default AddCategory;
