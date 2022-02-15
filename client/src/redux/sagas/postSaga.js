import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import { writePostSuccess, writePostFailure } from "../reducers/postReducer";
import {
  loadPostListSuccess,
  loadPostListFailure,
  removePostFailure,
  removePostSuccess,
} from "../reducers/postReducer";

// 글쓰기
const WritePostAPI = (data) => {
  return axios.post("/api/post", data);
};

function* WritePost({ data }) {
  try {
    const result = yield call(WritePostAPI, data);
    console.log("@@@@@", result);
    yield put(writePostSuccess(result.data));
  } catch (e) {
    yield put(writePostFailure(e));
  }
}

function* watchWritePost() {
  yield takeEvery("WRITE_POST_REQUEST", WritePost);
}

// 게시물 불러오기
const LoadPostListAPI = (data) => {
  console.log("data:    ", data);
  return axios.get(`/api/post/${data}`);
};

function* LoadPostList({ data }) {
  try {
    const result = yield call(LoadPostListAPI, data);
    console.log("result", result);
    yield put(loadPostListSuccess(result.data));
  } catch (e) {
    console.log(e);
    yield put(loadPostListFailure(e));
  }
}

function* watchLoadPostList() {
  yield takeEvery("LOAD_POST_LIST_REQUEST", LoadPostList);
}

// 게시물 삭제하기
const RemovePostAPI = (data) => {
  console.log("post id:    ", data);
  return axios.delete(`/api/post`, {
    data: {
      id: data,
    },
    withCredentials: true,
  });
};

function* RemovePost({ data }) {
  try {
    // data == id
    const result = yield call(RemovePostAPI, data);
    console.log("remove result", result);
    yield put(removePostSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(removePostFailure(e));
  }
}

function* watchRemovePost() {
  yield takeEvery("REMOVE_POST_REQUEST", RemovePost);
}

export default function* postSaga() {
  yield all([
    fork(watchWritePost),
    fork(watchLoadPostList),
    fork(watchRemovePost),
  ]);
}
