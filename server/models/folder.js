import mongoose from "mongoose";

// 자동 증가 번호(id) 생성 패키지
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

// 스키마 생성
const folderSchema = new mongoose.Schema({
  id: {
    type: Number, // Number 여야만 한다.
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

folderSchema.plugin(autoIncrement.plugin, {
  model: "folder",
  field: "id",
  startAt: 1,
  increment: 1,
});

// 위의 스키마를 바탕으로 하는 몽고 DB 콜렉션 생성
const Folder = mongoose.model("folder", folderSchema);

export default Folder;
