// 초기 state
export const initialState = {
  categoryList: [
    {
      id: 0,
      title: "Home",
    },
  ],
  loading: false,
  error: "",
};

// 액션 타입
const ADD_CATEGORY_REQUEST = "ADD_CATEGORY_REQUEST";
const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
const ADD_CATEGORY_FAILURE = "ADD_CATEGORY_FAILURE";

const LOAD_CATEGORY_LIST_REQUEST = "LOAD_CATEGORY_LIST_REQUEST";
const LOAD_CATEGORY_LIST_SUCCESS = "LOAD_CATEGORY_LIST_SUCCESS";
const LOAD_CATEGORY_LIST_FAILURE = "LOAD_CATEGORY_LIST_FAILURE";

const REMOVE_CATEGORY_REQUEST = "REMOVE_CATEGORY_REQUEST";
const REMOVE_CATEGORY_SUCCESS = "REMOVE_CATEGORY_SUCCESS";
const REMOVE_CATEGORY_FAILURE = "REMOVE_CATEGORY_FAILURE";

// 카테고리 추가하기
export const addCategoryRequest = (data) => {
  return {
    type: ADD_CATEGORY_REQUEST,
    data,
  };
};
export const addCategorySuccess = (data) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data,
  };
};
export const addCategoryFailure = (data) => {
  return {
    type: ADD_CATEGORY_FAILURE,
    data,
  };
};
// 카테고리 불러오기
export const loadCategoryListRequest = (data) => {
  return {
    type: LOAD_CATEGORY_LIST_REQUEST,
    data,
  };
};
export const loadCategoryListSuccess = (data) => {
  return {
    type: LOAD_CATEGORY_LIST_SUCCESS,
    data,
  };
};
export const loadCategoryListFailure = (data) => {
  return {
    type: LOAD_CATEGORY_LIST_FAILURE,
    data,
  };
};
// 카테고리 삭제하기
export const removeCategoryRequest = (data) => {
  return {
    type: REMOVE_CATEGORY_REQUEST,
    data,
  };
};
export const removeCategorySuccess = (data) => {
  return {
    type: REMOVE_CATEGORY_SUCCESS,
    data,
  };
};
export const removeCategoryFailure = (data) => {
  return {
    type: REMOVE_CATEGORY_FAILURE,
    data,
  };
};

// 리듀서
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // 카테고리 추가하기
    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: [
          ...state.categoryList,
          {
            id: action.data.id,
            title: action.data.title,
          },
        ],
        loading: false,
        error: "",
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 카테고리 불러오기
    case LOAD_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: [...state.categoryList, ...action.data],
        loading: false,
      };
    case LOAD_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 카테고리 삭제하기
    case REMOVE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: state.categoryList.filter((v) => {
          return v.id !== action.data;
        }),
        loading: false,
      };
    case REMOVE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    default:
      return state;
  }
};

export default categoryReducer;
