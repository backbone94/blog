import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  addFolderSuccess,
  addFolderFailure,
  loadFolderListSuccess,
  loadFolderListFailure,
  removeFolderSuccess,
  removeFolderFailure,
} from "../reducers/folderReducer";

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
      // 에러가 없다면
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
  console.log("data: ", data);
  return axios.get("/api/folder");
};

function* LoadFolderList({ data }) {
  try {
    const result = yield call(LoadFolderListAPI, data);
    console.log("result: ", result);
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
      title: data.title,
      category: data.category,
    },
    withCredentials: true,
  });
};

function* RemoveFolder({ data }) {
  try {
    const result = yield call(RemoveFolderAPI, data);
    console.log("remove result: ", result);
    yield put(removeFolderSuccess(data));
  } catch (e) {
    yield put(removeFolderFailure(e));
  }
}

function* watchRemoveFolder() {
  yield takeEvery("REMOVE_FOLDER_REQUEST", RemoveFolder);
}

export default function* postSaga() {
  yield all([
    fork(watchAddFolder),
    fork(watchLoadFolderList),
    fork(watchRemoveFolder),
  ]);
}
