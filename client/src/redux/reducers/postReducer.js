// 초기 state
export const postInitialState = {
  postList: [],
  post: {},
  newPostId: 10,
  loading: false,
  error: "",
};

// 액션 타입
const WRITE_POST_REQUEST = "WRITE_POST_REQUEST";
const WRITE_POST_SUCCESS = "WRITE_POST_SUCCESS";
const WRITE_POST_FAILURE = "WRITE_POST_FAILURE";

const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

const LOAD_POST_LIST_REQUEST = "LOAD_POST_LIST_REQUEST";
const LOAD_POST_LIST_SUCCESS = "LOAD_POST_LIST_SUCCESS";
const LOAD_POST_LIST_FAILURE = "LOAD_POST_LIST_FAILURE";

const LOAD_DETAIL_POST_REQUEST = "LOAD_DETAIL_POST_REQUEST";
const LOAD_DETAIL_POST_SUCCESS = "LOAD_DETAIL_POST_SUCCESS";
const LOAD_DETAIL_POST_FAILURE = "LOAD_DETAIL_POST_FAILURE";

const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

const MOVE_POST_REQUEST = "MOVE_POST_REQUEST";
const MOVE_POST_SUCCESS = "MOVE_POST_SUCCESS";
const MOVE_POST_FAILURE = "MOVE_POST_FAILURE";

const REMOVE_POST_LIST_REQUEST = "REMOVE_POST_LIST_REQUEST";
const REMOVE_POST_LIST_SUCCESS = "REMOVE_POST_LIST_SUCCESS";
const REMOVE_POST_LIST_FAILURE = "REMOVE_POST_LIST_FAILURE";

const SEARCH_POST_REQUEST = "SEARCH_POST_REQUEST";
const SEARCH_POST_SUCCESS = "SEARCH_POST_SUCCESS";
const SEARCH_POST_FAILURE = "SEARCH_POST_FAILURE";

const CLEAR_POST_LIST_REQUEST = "CLEAR_POST_LIST_REQUEST";
const CLEAR_POST_LIST_SUCCESS = "CLEAR_POST_LIST_SUCCESS";
const CLEAR_POST_LIST_FAILURE = "CLEAR_POST_LIST_FAILURE";

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

// 게시글 수정하기
export const updatePostRequest = (data) => {
  return {
    type: UPDATE_POST_REQUEST,
    data,
  };
};
export const updatePostSuccess = (data) => {
  return {
    type: UPDATE_POST_SUCCESS,
    data,
  };
};
export const updatePostFailure = (data) => {
  return {
    type: UPDATE_POST_FAILURE,
    data,
  };
};

// 게시글 list 불러오기
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

// 클릭한 게시글 불러오기
export function loadDetailPostRequest(data) {
  return {
    type: LOAD_DETAIL_POST_REQUEST,
    data,
  };
}
export function loadDetailPostSuccess(data) {
  return {
    type: LOAD_DETAIL_POST_SUCCESS,
    data,
  };
}
export function loadDetailPostFailure(data) {
  return {
    type: LOAD_DETAIL_POST_FAILURE,
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

// 게시글 이동하기
export function movePostRequest(data) {
  return {
    type: MOVE_POST_REQUEST,
    data,
  };
}
export function movePostSuccess(data) {
  return {
    type: MOVE_POST_SUCCESS,
    data,
  };
}
export function movePostFailure(data) {
  return {
    type: MOVE_POST_FAILURE,
    data,
  };
}

// 삭제된 카테고리 또는 폴더 내부에 있었던 모든 게시글 삭제하기
export function removePostListRequest(payload) {
  return {
    type: REMOVE_POST_LIST_REQUEST,
    data: { category: payload.category, folder: payload.folder },
  };
}
export function removePostListSuccess() {
  return {
    type: REMOVE_POST_LIST_SUCCESS,
  };
}
export function removePostListFailure(data) {
  return {
    type: REMOVE_POST_LIST_FAILURE,
    data,
  };
}

// 게시글 검색하기
export function searchPostRequest(data) {
  return {
    type: SEARCH_POST_REQUEST,
    data,
  };
}
export function searchPostSuccess(data) {
  return {
    type: SEARCH_POST_SUCCESS,
    data,
  };
}
export function searchPostFailure(data) {
  return {
    type: SEARCH_POST_FAILURE,
    data,
  };
}

// 게시글 리스트 clear
export function clearPostListRequest(data) {
  return {
    type: CLEAR_POST_LIST_REQUEST,
    data,
  };
}
export function clearPostListSuccess(data) {
  return {
    type: CLEAR_POST_LIST_SUCCESS,
    data,
  };
}
export function clearPostListFailure(data) {
  return {
    type: CLEAR_POST_LIST_FAILURE,
    data,
  };
}

// 리듀서
export default function postReducer(state = postInitialState, action) {
  switch (action.type) {
    // 게시글 작성하기
    case WRITE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WRITE_POST_SUCCESS:
      state.newPostId = action.data.id;
      return {
        ...state,
        postList: [
          ...state.postList,
          {
            title: action.data.title,
            content: action.data.content,
            category: action.data.category,
            folder: action.data.folder,
            fileUrl: action.data.fileUrl,
            comments: action.data.comments,
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

    // 게시글 수정하기
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_POST_SUCCESS:
      console.log("action.data: ", action.data);
      return {
        ...state,
        post: action.data,
        loading: false,
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // 게시글 list 불러오기
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

    // 클릭한 게시글 불러오기
    case LOAD_DETAIL_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_DETAIL_POST_SUCCESS:
      console.log("action.data: ", action.data);
      return {
        ...state,
        post: action.data,
        loading: false,
      };
    case LOAD_DETAIL_POST_FAILURE:
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

    // 게시글 이동하기
    case MOVE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MOVE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case MOVE_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // 삭제된 폴더 내부에 있었던 모든 게시글 삭제하기
    case REMOVE_POST_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_POST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_POST_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // 게시글 검색하기
    case SEARCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        postList: action.data,
        loading: false,
      };
    case SEARCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // 게시글 리스트 clear
    case CLEAR_POST_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_POST_LIST_SUCCESS:
      return {
        ...state,
        postList: [],
        loading: false,
      };
    case CLEAR_POST_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
