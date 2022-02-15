import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  addLangFailure,
  addLangSuccess,
  loadLangListSuccess,
  loadLangListFailure,
} from "../reducers/langReducer";

// 언어 카테고리 추가하기
const addLangAPI = (data) => {
  return axios.post("/api/langCategory", data);
};

function* AddLang({ data }) {
  try {
    const result = yield call(addLangAPI, data);
    result.data.title = result.data.title.toUpperCase();
    yield put(addLangSuccess(result.data));
  } catch (e) {
    yield put(addLangFailure(e));
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

export default function* postSaga() {
  yield all([fork(watchAddLang), fork(watchLoadLangList)]);
}
