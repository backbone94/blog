import { postInitialState } from "./postReducer";

// 초기 state
const initialState = {
  commentList: [],
  loading: false,
  error: "",
};

// 액션 타입
const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";

const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

// 댓글 생성하기
export const createCommentRequest = (data) => {
  return {
    type: CREATE_COMMENT_REQUEST,
    data,
  };
};
export const createCommentSuccess = (data) => {
  return {
    type: CREATE_COMMENT_SUCCESS,
    data,
  };
};
export const createCommentFailure = (data) => {
  return {
    type: CREATE_COMMENT_FAILURE,
    data,
  };
};

// 댓글 삭제하기
export const deleteCommentRequest = (data) => {
  return {
    type: DELETE_COMMENT_REQUEST,
    data,
  };
};
export const deleteCommentSuccess = (data) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    data,
  };
};
export const deleteCommentFailure = (data) => {
  return {
    type: DELETE_COMMENT_FAILURE,
    data,
  };
};

// 리듀서
export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    // 댓글 생성
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        commentList: [...state.commentList, action.data],
        loading: false,
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 댓글 삭제
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        commentList: action.data,
        loading: false,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    default:
      return state;
  }
}
