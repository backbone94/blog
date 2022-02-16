import { all, fork } from "redux-saga/effects";
import axios from "axios";
import folderSaga from "./folderSaga";
import postSaga from "./postSaga";

axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(folderSaga), fork(postSaga)]);
}
