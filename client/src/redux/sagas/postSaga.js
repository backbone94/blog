import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  writePostSuccess,
  writePostFailure,
  loadPostListSuccess,
  loadPostListFailure,
  loadDetailPostSuccess,
  loadDetailPostFailure,
  removePostFailure,
  removePostSuccess,
  searchPostSuccess,
  searchPostFailure,
} from "../reducers/postReducer";

// 글쓰기
const WritePostAPI = (data) => {
  return axios.post("/api/post", data);
};

function* WritePost({ data }) {
  try {
    const result = yield call(WritePostAPI, data);
    yield put(writePostSuccess(result.data));
  } catch (e) {
    yield put(writePostFailure(e));
  }
}

function* watchWritePost() {
  yield takeEvery("WRITE_POST_REQUEST", WritePost);
}

// 게시글 list 불러오기
const LoadPostListAPI = (data) => {
  return axios.get("/api/post/", {
    params: { category: data.category, folder: data.folder },
  });
};

function* LoadPostList({ data }) {
  try {
    const result = yield call(LoadPostListAPI, data);
    // console.log("result: ", result.data);
    yield put(loadPostListSuccess(result.data));
  } catch (e) {
    console.log(e);
    yield put(loadPostListFailure(e));
  }
}

function* watchLoadPostList() {
  yield takeEvery("LOAD_POST_LIST_REQUEST", LoadPostList);
}

// 클릭한 게시글 불러오기
const LoadDetailPostAPI = (data) => {
  return axios.get("/api/post/detailPost", {
    params: { postId: data },
  });
};

function* LoadDetailPost({ data }) {
  try {
    const result = yield call(LoadDetailPostAPI, data);
    // console.log("detailPost result: ", result.data[0]);
    yield put(loadDetailPostSuccess(result.data[0]));
  } catch (e) {
    console.log(e);
    yield put(loadDetailPostFailure(e));
  }
}

function* watchLoadDetailPost() {
  yield takeEvery("LOAD_DETAIL_POST_REQUEST", LoadDetailPost);
}

// 게시물 검색하기
const SearchPostAPI = (data) => {
  return axios.get("/api/post/searchPost", {
    params: { title: data },
  });
};

function* SearchPost({ data }) {
  try {
    const result = yield call(SearchPostAPI, data);
    console.log("검색한 게시물: ", result.data);
    yield put(searchPostSuccess(result.data));
  } catch (e) {
    console.log(e);
    yield put(searchPostFailure(e));
  }
}

function* watchSearchPost() {
  yield takeEvery("SEARCH_POST_REQUEST", SearchPost);
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
    fork(watchLoadDetailPost),
    fork(watchSearchPost),
    fork(watchRemovePost),
  ]);
}
