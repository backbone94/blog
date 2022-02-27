import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// Folder 이미지를 s3에 저장하고 이미지 경로 가져오기
const requestImg = async (e) => {
  const formData = new FormData();
  formData.append("upload", e.target.files[0]);
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASIC_SERVER_URL}/api/folder/image`,
      formData
    );

    // 이미지 경로에서 정규표현식을 활용하여 카테고리 제목 찾아내기
    if (/.{1,}(?=.ico)/.test(result.data.url[0])) {
      // 이미지 파일이 ico인 경우
      const temp = result.data.url[0]
        .match(/(?<=upload\/).{1,}(?=.ico)/)[0]
        .match(/[a-zA-Z]/g)
        .join("");
      return { url: result.data.url[0], regExp: temp };
    } else {
      // 이미지 파일이 ico가 아닌 경우
      return { url: result.data.url[0] };
    }
  } catch (e) {
    console.log(e);
    alert("server error");
  }
};

export default requestImg;
