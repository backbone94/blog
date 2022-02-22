import { Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateCategoryRequest } from "../redux/reducers/categoryReducer";
import {
  loadFolderListRequest,
  moveFolderRequest,
} from "../redux/reducers/folderReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { movePostRequest } from "../redux/reducers/postReducer";

const ModalOfUpdate = ({
  selectedObject,
  title,
  folder,
  category,
  setTitle,
  isModalVisible,
  setIsModalVisible,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (isModalVisible) setIsModalVisible(true);

  const handleOk = () => {
    if (category) {
      dispatch(updateCategoryRequest({ id: selectedObject.id, title }));
      console.log("이전 카테고리 타이틀: ", category.title);
      dispatch(
        moveFolderRequest({
          prevCategory: category.title,
          newCategory: title,
        })
      );
      dispatch(
        movePostRequest({
          prevCategory: category.title,
          newCategory: title,
        })
      );
      dispatch(loadFolderListRequest(title));
      history.push(`/${title}`);
    } else {
    }

    setTitle("");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTitle("");
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={
          <>
            <EditOutlined /> update
          </>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* title 부분 */}
        <div>
          <label className="mb-2">Title</label>
          <Input
            placeholder="Enter the Title"
            style={{ display: "block", width: "100%" }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalOfUpdate;
