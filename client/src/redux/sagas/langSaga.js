import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  addLangFailure,
  addLangSuccess,
  loadLangListSuccess,
  loadLangListFailure,
  removeCategorySuccess,
  removeCategoryFailure,
} from "../reducers/langReducer";

// 언어 카테고리 추가하기
const addLangAPI = (data) => {
  return axios.post("/api/langCategory", data);
};

function* AddLang({ data }) {
  try {
    const result = yield call(addLangAPI, data);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      console.log("temp", result.data.error);
      yield put(addLangFailure(result.data.error));
    } else {
      // 에러가 없다면
      console.log("result.data: ", result.data);
      yield put(addLangSuccess(result.data));
    }
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(addLangFailure(e));
    // alert(result.data.msg);
  }
}

function* watchAddLang() {
  yield takeEvery("ADD_LANG_REQUEST", AddLang);
}

// 언어 카테고리 불러오기
const LoadLangListAPI = (data) => {
  return axios.get("/api/langCategory");
};

function* LoadLangList({ data }) {
  try {
    const result = yield call(LoadLangListAPI, data);
    yield put(loadLangListSuccess(result.data));
  } catch (e) {
    yield put(loadLangListFailure(e));
  }
}

function* watchLoadLangList() {
  yield takeEvery("LOAD_LANG_LIST_REQUEST", LoadLangList);
}

// 언어 카테고리 삭제하기
const RemoveCategoryAPI = (data) => {
  return axios.delete("/api/langCategory", {
    data: {
      title: data,
    },
    withCredentials: true,
  });
};

function* RemoveCategory({ data }) {
  try {
    console.log("action.data: ", data);
    const result = yield call(RemoveCategoryAPI, data);
    console.log("remove result", result);
    yield put(removeCategorySuccess(data));
  } catch (e) {
    yield put(removeCategoryFailure(e));
  }
}

function* watchRemoveCategory() {
  yield takeEvery("REMOVE_CATEGORY_REQUEST", RemoveCategory);
}

export default function* postSaga() {
  yield all([
    fork(watchAddLang),
    fork(watchLoadLangList),
    fork(watchRemoveCategory),
  ]);
}
