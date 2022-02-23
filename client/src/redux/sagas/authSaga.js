import axios from "axios";
import { message } from "antd";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  createAccountSuccess,
  createAccountFailure,
  logInSuccess,
  logInFailure,
} from "../reducers/authReducer";

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

export default function* authSaga() {
  yield all([fork(watchCreateAccount), fork(watchLogIn)]);
}
