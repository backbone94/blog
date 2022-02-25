import axios from "axios";
import { message } from "antd";
import { put, takeEvery, all, fork, call } from "redux-saga/effects";
import {
  createCommentSuccess,
  createCommentFailure,
  deleteCommentSuccess,
  deleteCommentFailure,
} from "../../redux/reducers/commentReducer";
import { updatePostSuccess } from "../reducers/postReducer";

// 댓글 생성
const CreateCommentAPI = (data) => {
  return axios.post(`/api/comment`, data);
};

function* CreateComment({ data }) {
  try {
    // data == content, post
    const result = yield call(CreateCommentAPI, data);
    console.log("create comment result: ", result);
    // 에러가 없다면 댓글을 생성했다는 메시지와 함께 액션 dispatch
    // yield put(createCommentSuccess(result.data.newComment));
    yield put(updatePostSuccess(result.data.updatePost));
    message.success({
      content: "댓글을 달았습니다.",
      style: {
        marginTop: "12vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
    console.log("댓글 생성 result: ", result.data);
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(createCommentFailure(e));
  }
}

function* watchCreateComment() {
  yield takeEvery("CREATE_COMMENT_REQUEST", CreateComment);
}

// 댓글 삭제
const deleteCommentAPI = (data) => {
  return axios.delete(`/api/comment/`, {
    data: {
      postId: data.postId,
      commentId: data.commentId,
    },
  });
};

function* deleteComment({ data }) {
  try {
    // data == post.id, comment.id
    const result = yield call(deleteCommentAPI, data);
    // 에러가 없다면 댓글을 생성했다는 메시지와 함께 액션 dispatch
    message.success({
      content: "댓글을 삭제하였습니다.",
      style: {
        marginTop: "12vh",
        fontFamily: '"Gamja Flower", cursive',
      },
    });
    console.log("댓글 삭제 result: ", result.data);
    yield put(deleteCommentSuccess(data));
    yield put(updatePostSuccess(result.data));
  } catch (e) {
    // 데이터 자체를 못 가져왔다면
    yield put(deleteCommentFailure(e));
  }
}

function* watchdeleteComment() {
  yield takeEvery("DELETE_COMMENT_REQUEST", deleteComment);
}

export default function* commentSaga() {
  yield all([fork(watchCreateComment), fork(watchdeleteComment)]);
}
