import axios from "axios";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  addCategorySuccess,
  addCategoryFailure,
  loadCategoryListSuccess,
  loadCategoryListFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  removeCategorySuccess,
  removeCategoryFailure,
} from "../reducers/categoryReducer";
import { message } from "antd";

// clear Error
function* clearError() {
  try {
    yield put({
      type: "CLEAR_ERROR_SUCCESS",
    });
  } catch (e) {
    yield put({
      type: "CLEAR_ERROR_FAILURE",
    });
    console.error(e);
  }
}

function* watchclearError() {
  yield takeEvery("CLEAR_ERROR_REQUEST", clearError);
}

// 카테고리 추가하기
const addCategoryAPI = (data) => {
  // post 함수의 두 번째 인자에는 "객체"가 전달되어야 한다.
  return axios.post("/api/category", { title: data });
};

function* AddCategory({ data }) {
  try {
    const result = yield call(addCategoryAPI, data);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(addCategoryFailure(result.data.error));
    } else {
      // 에러가 없다면 카테고리를 추가했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "카테고리를 추가하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      yield put(addCategorySuccess(result.data));
    }
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(addCategoryFailure(e));
  }
}

function* watchAddCategory() {
  yield takeEvery("ADD_CATEGORY_REQUEST", AddCategory);
}

// 카테고리 불러오기
const LoadCategoryListAPI = () => {
  return axios.get("/api/category");
};

function* LoadCategoryList() {
  try {
    const result = yield call(LoadCategoryListAPI);
    console.log("카테고리 불러오기: ", result.data);
    yield put(loadCategoryListSuccess(result.data));
  } catch (e) {
    console.log(e);
    yield put(loadCategoryListFailure(e));
  }
}

function* watchLoadCategoryList() {
  yield takeEvery("LOAD_CATEGORY_LIST_REQUEST", LoadCategoryList);
}

// 카테고리 수정하기
const updateCategoryAPI = (data) => {
  return axios.post("/api/category/updateCategory", data);
};

function* updateCategory({ data }) {
  try {
    const result = yield call(updateCategoryAPI, data);
    // console.log("update category result: ", result);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(updateCategoryFailure(result.data.error));
    } else {
      // 에러가 없다면 카테고리를 수정했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "카테고리를 수정하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      yield put(updateCategorySuccess(result.data));
    }
  } catch (e) {
    yield put(updateCategoryFailure(e));
  }
}

function* watchUpdateCategory() {
  yield takeEvery("UPDATE_CATEGORY_REQUEST", updateCategory);
}

// 카테고리 삭제하기
const RemoveCategoryAPI = (data) => {
  return axios.delete(`/api/category`, { params: { id: data } });
};

function* RemoveCategory({ data }) {
  try {
    const result = yield call(RemoveCategoryAPI, data);
    console.log("카테고리 삭제 result: ", result);
    yield put(removeCategorySuccess(data));
  } catch (e) {
    console.log(e);
    yield put(removeCategoryFailure(e));
  }
}

function* watchRemoveCategory() {
  yield takeEvery("REMOVE_CATEGORY_REQUEST", RemoveCategory);
}

export default function* categorySaga() {
  yield all([
    fork(watchclearError),
    fork(watchAddCategory),
    fork(watchLoadCategoryList),
    fork(watchUpdateCategory),
    fork(watchRemoveCategory),
  ]);
}
