import mongoose from "mongoose";
import moment from "moment";

// 자동 증가 번호(id) 생성 패키지
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const PostSchema = new mongoose.Schema({
  id: {
    type: Number, // Number 여야만 한다.
    default: 0,
  },
  title: {
    required: true,
    type: String,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: -2,
  },
  fileUrl: {
    type: String,
    default: "https://source.unsplash.com/random/301x201",
  },
  date: {
    type: String,
    default: moment().format("YY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

PostSchema.plugin(autoIncrement.plugin, {
  model: "post",
  field: "id",
  startAt: 1,
  increment: 1,
});

const Post = mongoose.model("post", PostSchema);

export default Post;
