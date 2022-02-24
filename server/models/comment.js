import mongoose from "mongoose";
import moment from "moment";

// 자동 증가 번호(id) 생성 패키지
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const CommentSchema = new mongoose.Schema({
  id: {
    type: Number, // Number 여야만 한다.
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: moment(),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: { type: String },
});

CommentSchema.plugin(autoIncrement.plugin, {
  model: "comment",
  field: "id",
  startAt: 1,
  increment: 1,
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
