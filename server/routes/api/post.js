import express from "express";

// Model
import Post from "../../models/post";

const router = express.Router();

// GET api/post/:id
router.get("/:id", async (req, res) => {
  try {
    console.log("req.params.id:        ", req.params.id);
    const result = await Post.find({ category: req.params.id });
    console.log(result, `All posts Get`);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// POST api/post
router.post("/", async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const newPost = await Post.create({
      title,
      content,
      category,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/post
router.delete("/", async (req, res) => {
  console.log("req.body: ", req.body);
  await Post.deleteOne({ _id: req.body.postId });
  return res.json({ success: true });
});

export default router;
