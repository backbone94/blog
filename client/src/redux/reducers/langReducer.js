// 초기 state
export const initialState = {
  lang: [],
  loading: false,
  error: "",
};

// 액션 타입
const ADD_LANG_REQUEST = "ADD_LANG_REQUEST";
const ADD_LANG_SUCCESS = "ADD_LANG_SUCCESS";
const ADD_LANG_FAILURE = "ADD_LANG_FAILURE";

const LOAD_LANG_LIST_REQUEST = "LOAD_LANG_LIST_REQUEST";
const LOAD_LANG_LIST_SUCCESS = "LOAD_LANG_LIST_SUCCESS";
const LOAD_LANG_LIST_FAILURE = "LOAD_LANG_LIST_FAILURE";

// 언어 카테고리 추가하기
export function addLangRequest(data) {
  return {
    type: ADD_LANG_REQUEST,
    data,
  };
}
export function addLangSuccess(data) {
  return {
    type: ADD_LANG_SUCCESS,
    data,
  };
}
export function addLangFailure(data) {
  return {
    type: ADD_LANG_FAILURE,
    data,
  };
}
// 언어 카테고리 불러오기
export function loadLangListRequest(data) {
  return {
    type: LOAD_LANG_LIST_REQUEST,
    data,
  };
}
export function loadLangListSuccess(data) {
  return {
    type: LOAD_LANG_LIST_SUCCESS,
    data,
  };
}
export function loadLangListFailure(data) {
  return {
    type: LOAD_LANG_LIST_FAILURE,
    data,
  };
}

// 리듀서
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    // 언어 카테고리 추가하기
    case ADD_LANG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_LANG_SUCCESS:
      return {
        ...state,
        lang: [
          ...state.lang,
          {
            title: action.data.title,
            fileUrl: action.data.fileUrl,
          },
        ],
        loading: false,
        error: "",
      };
    case ADD_LANG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 언어 카테고리 불러오기
    case LOAD_LANG_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LANG_LIST_SUCCESS:
      return {
        ...state,
        lang: [...action.data],
        loading: false,
      };
    case LOAD_LANG_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    default:
      return state;
  }
}
