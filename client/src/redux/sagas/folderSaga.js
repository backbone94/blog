import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  addFolderSuccess,
  addFolderFailure,
  loadFolderListSuccess,
  loadFolderListFailure,
  removeFolderSuccess,
  removeFolderFailure,
  removeFolderListSuccess,
  removeFolderListFailure,
  moveFolderSuccess,
  moveFolderFailure,
  updateFolderSuccess,
  updateFolderFailure,
  loadFolderListRequest,
} from "../reducers/folderReducer";
import { message } from "antd";

// 폴더 추가하기
const addFolderAPI = (data) => {
  return axios.post("/api/folder", data);
};

function* AddFolder({ data }) {
  try {
    const result = yield call(addFolderAPI, data);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(addFolderFailure(result.data.error));
    } else {
      // 에러가 없다면 폴더를 추가했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "폴더를 추가하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      yield put(addFolderSuccess(result.data));
    }
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(addFolderFailure(e));
  }
}

function* watchAddFolder() {
  yield takeEvery("ADD_FOLDER_REQUEST", AddFolder);
}

// 폴더 불러오기
const LoadFolderListAPI = (data) => {
  return axios.get("/api/folder", { params: { category: data } });
};

function* LoadFolderList({ data }) {
  try {
    const result = yield call(LoadFolderListAPI, data);
    yield put(loadFolderListSuccess(result.data));
  } catch (e) {
    yield put(loadFolderListFailure(e));
  }
}

function* watchLoadFolderList() {
  yield takeEvery("LOAD_FOLDER_LIST_REQUEST", LoadFolderList);
}

// 폴더 삭제하기
const RemoveFolderAPI = (data) => {
  return axios.delete("/api/folder", {
    data: {
      id: data,
    },
    withCredentials: true,
  });
};

function* RemoveFolder({ data }) {
  try {
    // data == 폴더 id
    yield call(RemoveFolderAPI, data);
    yield put(removeFolderSuccess(data));
  } catch (e) {
    yield put(removeFolderFailure(e));
  }
}

function* watchRemoveFolder() {
  yield takeEvery("REMOVE_FOLDER_REQUEST", RemoveFolder);
}

// 폴더 이동하기
const moveFolderAPI = (data) => {
  return axios.post("/api/folder/moveFolder", data);
};

function* moveFolder({ data }) {
  try {
    // data == prevCategory, newCategory
    const result = yield call(moveFolderAPI, data);
    console.log("move folder result: ", result);
    yield put(moveFolderSuccess(data));
  } catch (e) {
    yield put(moveFolderFailure(e));
  }
}

function* watchmoveFolder() {
  yield takeEvery("MOVE_FOLDER_REQUEST", moveFolder);
}

// 폴더 수정하고 카테고리 이동하기
const updateFolderAPI = (data) => {
  return axios.post("/api/folder/updateFolder", data);
};

function* updateFolder({ data }) {
  try {
    // data == id, newCategory, newTitle, prevCategory(옵션)
    const result = yield call(updateFolderAPI, data);
    console.log("update folder result: ", result);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(updateFolderFailure(result.data.error));
    } else {
      // 에러가 없다면 폴더를 추가했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "폴더를 수정하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      yield put(updateFolderSuccess(result.data));
      // 폴더 update 이후에 folder list 불러오기
      if (data.newCategory) yield put(loadFolderListRequest(data.newCategory));
      else yield put(loadFolderListRequest(data.prevCategory));
    }
  } catch (e) {
    yield put(updateFolderFailure(e));
  }
}

function* watchUpdateFolder() {
  yield takeEvery("UPDATE_FOLDER_REQUEST", updateFolder);
}

// 삭제된 카테고리 내부에 있었던 모든 폴더 삭제하기
const RemoveFolderListAPI = (data) => {
  return axios.delete(`/api/folder/folderList`, {
    data: {
      category: data,
    },
    withCredentials: true,
  });
};

function* RemoveFolderList({ data }) {
  try {
    // data == category
    const result = yield call(RemoveFolderListAPI, data);
    console.log("remove folder List result", result);
    yield put(removeFolderListSuccess());
  } catch (e) {
    console.log(e);
    yield put(removeFolderListFailure(e));
  }
}

function* watchRemoveFolderList() {
  yield takeEvery("REMOVE_FOLDER_LIST_REQUEST", RemoveFolderList);
}

export default function* postSaga() {
  yield all([
    fork(watchAddFolder),
    fork(watchLoadFolderList),
    fork(watchRemoveFolder),
    fork(watchRemoveFolderList),
    fork(watchmoveFolder),
    fork(watchUpdateFolder),
  ]);
}
