import mongoose from "mongoose";

// 자동 증가 번호(id) 생성 패키지
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

// 스키마 생성
const CategorySchema = new mongoose.Schema({
  id: {
    type: Number, // Number 여야만 한다.
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

CategorySchema.plugin(autoIncrement.plugin, {
  model: "category",
  field: "id",
  startAt: 1,
  increment: 1,
});

// 위의 스키마를 바탕으로 하는 몽고 DB 콜렉션 생성
const Category = mongoose.model("category", CategorySchema);

export default Category;
