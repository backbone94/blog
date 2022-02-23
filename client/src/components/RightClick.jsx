import {
  Popconfirm,
  Dropdown,
  Menu,
  message,
  Modal,
  Input,
  Button,
} from "antd";
import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  removePostListRequest,
  movePostRequest,
} from "../redux/reducers/postReducer";
import {
  removeFolderRequest,
  removeFolderListRequest,
  moveFolderRequest,
  updateFolderRequest,
} from "../redux/reducers/folderReducer";
import {
  removeCategoryRequest,
  updateCategoryRequest,
} from "../redux/reducers/categoryReducer";

import { useDispatch } from "react-redux";

const RightClick = ({ tag, category, folder, categoryList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState(folder && folder.title);
  const [categoryOfFolder, setCategoryOfFolder] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const msg = (target) =>
    message.success({
      content: `${target}를 삭제하였습니다.`,
      style: {
        marginTop: "12vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });

  // 카테고리 삭제 confirm 창
  const removeCategory = (category) => {
    dispatch(removePostListRequest({ category: category.title }));
    dispatch(removeFolderListRequest(category.title));
    dispatch(removeCategoryRequest(category.id));
    msg("카테고리");
    history.replace("/");
  };

  // 폴더 삭제 confirm 창
  const removeFolder = (id, folderTitle) => {
    dispatch(removeFolderRequest(id));
    dispatch(removePostListRequest({ folder: folderTitle }));
    msg("폴더");
  };

  const menuStyle = {
    fontFamily: '"Gamja Flower", cursive',
    marginLeft: 5,
    fontSize: 15,
  };

  // Modal Ok 버튼
  const handleOk = () => {
    // category 수정
    if (category) {
      dispatch(updateCategoryRequest({ id: category.id, title }));
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
      history.push(`/${title}`);

      // folder 수정
    } else {
      console.log("categoryOfFolder: ", categoryOfFolder, "title: ", title);
      dispatch(
        updateFolderRequest({
          id: folder.id,
          newCategory: categoryOfFolder,
          newTitle: title,
        })
      );
      dispatch(
        movePostRequest({
          prevCategory: folder.category,
          newCategory: categoryOfFolder,
          newFolder: title,
        })
      );
      history.push(`/${categoryOfFolder}`);
    }

    setCategoryOfFolder("");
    setTitle("");
    setIsModalVisible(false);
  };

  // Modal cancel 버튼
  const handleCancel = () => {
    setCategoryOfFolder("");
    setTitle("");
    setIsModalVisible(false);
  };

  // 우클릭 메뉴
  const contextMenu = (
    <Menu>
      <Menu.Item onClick={() => setIsModalVisible(true)} key="1">
        <EditOutlined />
        <span style={menuStyle}>수정</span>
      </Menu.Item>
      <Popconfirm
        title="정말 삭제하시겠습니까?"
        onConfirm={() => {
          category
            ? removeCategory(category)
            : removeFolder(folder.id, folder.title);
        }}
        okText="네"
        cancelText="아니오"
      >
        <Menu.Item key="2">
          <DeleteOutlined />
          <span style={menuStyle}>삭제</span>
        </Menu.Item>
      </Popconfirm>
    </Menu>
  );

  const categoryDropdown = (
    <Menu>
      {categoryList &&
        categoryList.map((category) => (
          <Menu.Item
            onClick={() => setCategoryOfFolder(category.title)}
            key={category.id}
          >
            {category.title !== "Home" && category.title}
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={contextMenu} trigger={["contextMenu"]}>
        {tag}
      </Dropdown>

      {/* 수정 Modal */}
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
        {/* category 부분 */}
        {folder ? (
          <div>
            <Dropdown overlay={categoryDropdown} trigger={["click"]}>
              <Button
                style={{ display: "block", width: "30%" }}
                className="mb-2"
              >
                {categoryOfFolder ? categoryOfFolder : "Select Category"}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        ) : null}

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

export default RightClick;
