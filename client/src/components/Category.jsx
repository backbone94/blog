import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CategoryLoading from "./loading/CategoryLoading";
import { loadPostListRequest } from "../redux/reducers/postReducer";
import { useHistory, useParams } from "react-router-dom";
import { notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../css/category.css";
import RightClick from "./RightClick";
import AddFolder from "./AddFolder";

export default function Category() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );
  const folderList = useSelector((state) => state.folderReducer.folderList);
  const error = useSelector((state) => state.folderReducer.error);
  const loading = useSelector((state) => state.folderReducer.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const category = params.category;

  const goFolder = (title) => {
    // 폴더 내부로 들어가기 전에 post list 미리 불러오기
    dispatch(loadPostListRequest({ category, folder: title }));
    history.push(`/${category}/${title}`);
  };

  // error 값이 존재하면 Alert 창 띄우기
  useEffect(() => {
    if (error) {
      notification.error({
        style: { fontFamily: '"Gamja Flower", cursive' },
        message: "에러",
        description: `${error}`,
      });
      setIsModalVisible(true);
      dispatch({ type: "CLEAR_ERROR_REQUEST" });
    }
  }, [dispatch, error]);

  return (
    <>
      {/* Folder List 불러오기 */}
      {loading ? (
        <CategoryLoading />
      ) : (
        <div className="categoryContainer">
          <div className="categoryName">{category}</div>
          <div className="folderListAndAddButton">
            {/* 폴더 리스트 */}
            <div className="folderList">
              {folderList.map((folder) => (
                <div key={folder.id} className="folderElement">
                  {/* 우클릭 */}
                  <RightClick
                    tag={
                      <img
                        onClick={() => goFolder(folder.title)}
                        style={{ cursor: "pointer" }}
                        alt={`${folder.title}`}
                        src={folder.fileUrl}
                      />
                    }
                    categoryList={categoryList}
                    folder={folder}
                  />
                  <div className="folderText">{folder.title}</div>
                </div>
              ))}
            </div>

            {/* 폴더 추가 버튼 */}
            <div className="addFolder">
              <div
                className="addFolderButton"
                onClick={() => setIsModalVisible(true)}
              >
                <div className="plus">
                  <PlusOutlined className="plusIcon" />
                  <div className="plusText">Add Folder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 폴더 추가 Modal */}
      <AddFolder
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        category={category}
      />
    </>
  );
}
