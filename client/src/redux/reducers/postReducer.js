// 초기 state
const initialState = {
  lang: [],
};

// 액션 타입
const IMAGE_UPLOADING_REQUEST = "IMAGE_UPLOADING_REQUEST";

// 액션 생성자
export function imageUploading(data) {
  return {
    type: IMAGE_UPLOADING_REQUEST,
    data,
  };
}

// 리듀서
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOADING_REQUEST:
      return {
        ...state,
        lang: [
          ...state.lang,
          {
            text: action.data.text,
            img: action.data.url,
          },
        ],
      };

    default:
      return state;
  }
}
