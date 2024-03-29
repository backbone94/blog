const initialState = {
  account: null,
  loading: false,
  error: "",
};

const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST";
const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS";
const CREATE_ACCOUNT_FAILURE = "CREATE_ACCOUNT_FAILURE";

const UPDATE_ACCOUNT_REQUEST = "UPDATE_ACCOUNT_REQUEST";
const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";
const UPDATE_ACCOUNT_FAILURE = "UPDATE_ACCOUNT_FAILURE";

const LOG_IN_REQUEST = "LOG_IN_REQUEST";
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
const LOG_IN_FAILURE = "LOG_IN_FAILURE";

const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

const CLEAR_ERROR_REQUEST = "CLEAR_ERROR_REQUEST";
const CLEAR_ERROR_SUCCESS = "CLEAR_ERROR_SUCCESS";
const CLEAR_ERROR_FAILURE = "CLEAR_ERROR_FAILURE";

const WITHDRAWAL_REQUEST = "WITHDRAWAL_REQUEST";
const WITHDRAWAL_SUCCESS = "WITHDRAWAL_SUCCESS";
const WITHDRAWAL_FAILURE = "WITHDRAWAL_FAILURE";

// 계정 생성하기
export const createAccountRequest = (data) => {
  return {
    type: CREATE_ACCOUNT_REQUEST,
    data,
  };
};
export const createAccountSuccess = (data) => {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    data,
  };
};
export const createAccountFailure = (data) => {
  return {
    type: CREATE_ACCOUNT_FAILURE,
    data,
  };
};

// 계정 수정하기
export const updateAccountRequest = (data) => {
  return {
    type: UPDATE_ACCOUNT_REQUEST,
    data,
  };
};
export const updateAccountSuccess = (data) => {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    data,
  };
};
export const updateAccountFailure = (data) => {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    data,
  };
};

// 로그인
export const logInRequest = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const logInSuccess = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};
export const logInFailure = (data) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};

// 로그아웃
export const logOutRequest = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  };
};
export const logOutSuccess = (data) => {
  return {
    type: LOG_OUT_SUCCESS,
    data,
  };
};
export const logOutFailure = (data) => {
  return {
    type: LOG_OUT_FAILURE,
    data,
  };
};

// 회원탈퇴
export const withdrawalRequest = (data) => {
  return {
    type: WITHDRAWAL_REQUEST,
    data,
  };
};
export const withdrawalSuccess = (data) => {
  return {
    type: WITHDRAWAL_SUCCESS,
    data,
  };
};
export const withdrawalFailure = (data) => {
  return {
    type: WITHDRAWAL_FAILURE,
    data,
  };
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // 계정 생성하기
    case CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.data,
        loading: false,
      };
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 계정 수정하기
    case UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.data,
        loading: false,
      };
    case UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 로그인
    case LOG_IN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        account: action.data,
        loading: false,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 로그아웃
    case LOG_OUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        account: null,
        loading: false,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 회원탈퇴
    case WITHDRAWAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WITHDRAWAL_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case WITHDRAWAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    // 에러 메시지 clear
    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
      };
    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        error: "",
      };
    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        error: "Clear Error Fail",
      };

    default:
      return state;
  }
}
