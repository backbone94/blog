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

export default function* postSaga() {
  yield all([
    fork(watchAddFolder),
    fork(watchLoadFolderList),
    fork(watchRemoveFolder),
  ]);
}
