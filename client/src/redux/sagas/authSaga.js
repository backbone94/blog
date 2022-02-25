import axios from "axios";
import { message } from "antd";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  createAccountSuccess,
  createAccountFailure,
  updateAccountSuccess,
  updateAccountFailure,
  logInSuccess,
  logInFailure,
  logOutSuccess,
  withdrawalSuccess,
  withdrawalFailure,
} from "../reducers/authReducer";
import { updatePostSuccess } from "../reducers/postReducer";

// 계정 생성
const CreateAccountAPI = (data) => {
  return axios.post(`/api/auth`, data);
};

function* CreateAccount({ data }) {
  try {
    const result = yield call(CreateAccountAPI, data);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(createAccountFailure(result.data.error));
    } else {
      // 에러가 없다면 계정을 생성했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "계정을 생성하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      console.log("계정 생성 result: ", result.data);
      yield put(createAccountSuccess(result.data));
    }
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(createAccountFailure(e));
  }
}

function* watchCreateAccount() {
  yield takeEvery("CREATE_ACCOUNT_REQUEST", CreateAccount);
}

// 계정 수정
const UpdateAccountAPI = (data) => {
  return axios.post(`/api/auth/updateAccount`, data);
};

function* UpdateAccount({ data }) {
  try {
    const result = yield call(UpdateAccountAPI, data);
    message.success({
      content: "계정을 수정하였습니다.",
      style: {
        marginTop: "12vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
    console.log("계정 수정 result: ", result.data);
    yield put(updateAccountSuccess(result.data));
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(updateAccountFailure(e));
  }
}

function* watchUpdateAccount() {
  yield takeEvery("UPDATE_ACCOUNT_REQUEST", UpdateAccount);
}

// 로그인
const LogInAPI = (data) => {
  return axios.get(`/api/auth`, { params: data });
};

function* LogIn({ data }) {
  try {
    const result = yield call(LogInAPI, data);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(logInFailure(result.data.error));
    } else {
      // 에러가 없다면 계정을 생성했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "로그인 하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      console.log("로그인 result: ", result.data);
      yield put(logInSuccess(result.data));
    }
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(logInFailure(e));
  }
}

function* watchLogIn() {
  yield takeEvery("LOG_IN_REQUEST", LogIn);
}

// 회원 탈퇴
const withdrawalAPI = (data) => {
  return axios.delete(`/api/auth`, { data: { _id: data } });
};

function* withdrawal({ data }) {
  try {
    // data == account._id
    const result = yield call(withdrawalAPI, data);
    if (result.data.error) {
      // 서버에서 데이터는 잘 가져왔지만 에러가 있다면
      yield put(withdrawalFailure(result.data.error));
    } else {
      // 에러가 없다면 계정을 생성했다는 메시지와 함께 액션 dispatch
      message.success({
        content: "회원을 탈퇴하였습니다.",
        style: {
          marginTop: "12vh",
          fontFamily: '"Gamja Flower", cursive',
        },
      });
      console.log("탈퇴 result: ", result.data);
      yield put(withdrawalSuccess());
      yield put(logOutSuccess());
      yield put(updatePostSuccess(result.data.updatePost));
    }
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(withdrawalFailure(e));
  }
}

function* watchWithdrawal() {
  yield takeEvery("WITHDRAWAL_REQUEST", withdrawal);
}

export default function* authSaga() {
  yield all([
    fork(watchCreateAccount),
    fork(watchLogIn),
    fork(watchUpdateAccount),
    fork(watchWithdrawal),
  ]);
}
