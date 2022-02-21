import express from "express";
import moment from "moment";

// Model
import Post from "../../models/post";

const router = express.Router();

// GET api/post/
router.get("/", async (req, res) => {
  try {
    const { category, folder } = req.query;
    // console.log("c", category, "f", folder);
    const result = await Post.find({
      category,
      folder,
    });
    console.log(result, `All posts Get`);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// GET api/post/detailPost
router.get("/detailPost", async (req, res) => {
  try {
    const { postId } = req.query;
    // console.log("c", category, "f", folder);
    const result = await Post.find({ id: postId });
    console.log(result, `post Get`);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// GET api/post/searchPost
router.get("/searchPost", async (req, res) => {
  try {
    const { title } = req.query;
    // console.log("c", category, "f", folder);
    const result = await Post.find({
      title,
    });
    console.log(result, `All posts Get`);
    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// POST api/post
router.post("/", async (req, res, next) => {
  try {
    const { title, content, category, folder } = req.body;
    const newPost = await Post.create({
      title,
      content,
      category,
      folder,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/post
router.delete("/", async (req, res) => {
  console.log("req.body: ", req.body);
  await Post.deleteOne({ id: req.body.id });
  res.json({ success: true });
});

export default router;
