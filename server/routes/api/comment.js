import express from "express";
import moment from "moment";

// 몽고 DB 콜렉션
import Comment from "../../models/comment";
import Post from "../../models/post";

const router = express.Router();

// POST api/comment
router.post("/", async (req, res, next) => {
  try {
    const { content, post, creator } = req.body;
    console.log("content: ", content, "post: ", post);
    // 댓글 생성
    const newComment = await Comment.create({
      content,
      post,
      creator,
      date: moment(),
    });

    // 생성한 댓글을 post와 연결시키기
    await Post.findOneAndUpdate(
      { id: post.id },
      { $push: { comments: newComment } },
      { new: true }
    )
      .populate({
        path: "comments",
        populate: { path: "creator" },
      })
      .then((updatePost) => res.json({ newComment, updatePost }));
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/comment
router.delete("/", async (req, res) => {
  console.log("req.body: ", req.body);
  await Comment.deleteOne({
    id: req.body.id,
  });
  res.json({ success: true });
});

export default router;
