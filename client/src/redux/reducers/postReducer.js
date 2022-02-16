// 초기 state
export const initialState = {
  postList: [],
  loading: false,
  error: "",
};

// 액션 타입
const WRITE_POST_REQUEST = "WRITE_POST_REQUEST";
const WRITE_POST_SUCCESS = "WRITE_POST_SUCCESS";
const WRITE_POST_FAILURE = "WRITE_POST_FAILURE";

const LOAD_POST_LIST_REQUEST = "LOAD_POST_LIST_REQUEST";
const LOAD_POST_LIST_SUCCESS = "LOAD_POST_LIST_SUCCESS";
const LOAD_POST_LIST_FAILURE = "LOAD_POST_LIST_FAILURE";

const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

// 게시글 작성하기
export const writePostRequest = (data) => {
  return {
    type: WRITE_POST_REQUEST,
    data,
  };
};
export const writePostSuccess = (data) => {
  return {
    type: WRITE_POST_SUCCESS,
    data,
  };
};
export const writePostFailure = (data) => {
  return {
    type: WRITE_POST_FAILURE,
    data,
  };
};

// 게시글 불러오기
export function loadPostListRequest(data) {
  return {
    type: LOAD_POST_LIST_REQUEST,
    data,
  };
}
export function loadPostListSuccess(data) {
  return {
    type: LOAD_POST_LIST_SUCCESS,
    data,
  };
}
export function loadPostListFailure(data) {
  return {
    type: LOAD_POST_LIST_FAILURE,
    data,
  };
}

// 게시글 삭제하기
export function removePostRequest(data) {
  return {
    type: REMOVE_POST_REQUEST,
    data,
  };
}
export function removePostSuccess(data) {
  return {
    type: REMOVE_POST_SUCCESS,
    data,
  };
}
export function removePostFailure(data) {
  return {
    type: REMOVE_POST_FAILURE,
    data,
  };
}

// 리듀서
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    // 게시글 작성하기
    case WRITE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WRITE_POST_SUCCESS:
      return {
        ...state,
        postList: [
          ...state.postList,
          {
            title: action.data.title,
            content: action.data.content,
            category: action.data.category,
            folder: action.data.folder,
            id: action.data.id,
          },
        ],
        loading: false,
      };
    case WRITE_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // 게시글 불러오기
    case LOAD_POST_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_POST_LIST_SUCCESS:
      return {
        ...state,
        postList: action.data,
        loading: false,
      };
    case LOAD_POST_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // 게시글 삭제하기
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        postList: state.postList.filter((v) => v.id !== action.data),
        loading: false,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
