import mongoose from "mongoose";

// 스키마 생성
const langCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  fileUrl: {
    type: String,
  },
  content: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

// 위의 스키마를 바탕으로 하는 몽고 DB 콜렉션 생성
const LangCategory = mongoose.model("langCategory", langCategorySchema);

export default LangCategory;
