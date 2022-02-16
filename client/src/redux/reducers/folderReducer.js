// 초기 state
export const initialState = {
  folderList: [],
  loading: false,
  error: "",
};

// 액션 타입
const ADD_FOLDER_REQUEST = "ADD_FOLDER_REQUEST";
const ADD_FOLDER_SUCCESS = "ADD_FOLDER_SUCCESS";
const ADD_FOLDER_FAILURE = "ADD_FOLDER_FAILURE";

const LOAD_FOLDER_LIST_REQUEST = "LOAD_FOLDER_LIST_REQUEST";
const LOAD_FOLDER_LIST_SUCCESS = "LOAD_FOLDER_LIST_SUCCESS";
const LOAD_FOLDER_LIST_FAILURE = "LOAD_FOLDER_LIST_FAILURE";

const REMOVE_FOLDER_REQUEST = "REMOVE_FOLDER_REQUEST";
const REMOVE_FOLDER_SUCCESS = "REMOVE_FOLDER_SUCCESS";
const REMOVE_FOLDER_FAILURE = "REMOVE_FOLDER_FAILURE";

// 폴더 추가하기
export const addFolderRequest = (data) => {
  return {
    type: ADD_FOLDER_REQUEST,
    data,
  };
};
export const addFolderSuccess = (data) => {
  return {
    type: ADD_FOLDER_SUCCESS,
    data,
  };
};
export const addFolderFailure = (data) => {
  return {
    type: ADD_FOLDER_FAILURE,
    data,
  };
};
// 폴더 불러오기
export const loadFolderListRequest = (data) => {
  return {
    type: LOAD_FOLDER_LIST_REQUEST,
    data,
  };
};
export const loadFolderListSuccess = (data) => {
  return {
    type: LOAD_FOLDER_LIST_SUCCESS,
    data,
  };
};
export const loadFolderListFailure = (data) => {
  return {
    type: LOAD_FOLDER_LIST_FAILURE,
    data,
  };
};
// 폴더 삭제하기
export const removeFolderRequest = (data) => {
  return {
    type: REMOVE_FOLDER_REQUEST,
    data,
  };
};
export const removeFolderSuccess = (data) => {
  return {
    type: REMOVE_FOLDER_SUCCESS,
    data,
  };
};
export const removeFolderFailure = (data) => {
  return {
    type: REMOVE_FOLDER_FAILURE,
    data,
  };
};

// 리듀서
const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    // 폴더 추가하기
    case ADD_FOLDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_FOLDER_SUCCESS:
      return {
        ...state,
        folderList: [
          ...state.folderList,
          {
            title: action.data.title,
            fileUrl: action.data.fileUrl,
            category: action.data.category,
          },
        ],
        loading: false,
        error: "",
      };
    case ADD_FOLDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 폴더 불러오기
    case LOAD_FOLDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_FOLDER_LIST_SUCCESS:
      return {
        ...state,
        folderList: [...state.folderList, ...action.data],
        loading: false,
      };
    case LOAD_FOLDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 폴더 삭제하기
    case REMOVE_FOLDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_FOLDER_SUCCESS:
      return {
        ...state,
        folderList: state.folderList.filter((v) => {
          return (
            v.title !== action.data.title && v.category !== action.data.category
          );
        }),
        loading: false,
      };
    case REMOVE_FOLDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    default:
      return state;
  }
};

export default folderReducer;
