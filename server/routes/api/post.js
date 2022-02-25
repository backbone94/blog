import express from "express";
import moment from "moment";

// Model
import Post from "../../models/post";

import "@babel/polyfill";

const router = express.Router();

// GET api/post/
router.get("/", async (req, res) => {
  try {
    const { category, folder } = req.query;
    console.log("c", category, "f", folder);
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
    await Post.find({ id: postId })
      .populate("creator") // ObjectId 로 되어 있는 객체를 풀어서 불러오기
      .populate({
        path: "comments",
        populate: { path: "creator" },
      })
      .then((detailPost) => {
        console.log(detailPost, "post Get");
        res.json(detailPost);
      });
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
    const { title, content, category, folder, creator } = req.body;
    const newPost = await Post.create({
      title,
      content,
      category,
      folder,
      date: moment(),
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

// POST api/post/updatePost
router.post("/updatePost", async (req, res, next) => {
  try {
    const { id, title, content } = req.body;
    const newPost = await Post.findOneAndUpdate(
      { id },
      { title, content, date: moment() },
      { new: true }
    );
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

// POST api/post/movePost
router.post("/movePost", async (req, res, next) => {
  try {
    const { prevCategory, newCategory, newFolder } = req.body;
    console.log("prevCategory: ", prevCategory, "newCategory: ", newCategory);
    const updatePost = await Post.updateMany(
      { category: prevCategory },
      { category: newCategory, folder: newFolder },
      { new: true }
    );
    res.json(updatePost);
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/post
router.delete("/", async (req, res) => {
  console.log("req.body: ", req.body.id);
  await Post.deleteOne({ id: req.body.id });
  res.json({ success: true });
});

// DELETE api/post/postList
router.delete("/postList", async (req, res) => {
  console.log("req.body.category: ", req.body.category);
  console.log("req.body.folder: ", req.body.folder);
  const { category, folder } = req.body;
  await Post.deleteMany(category ? { category } : { folder });
  res.json({ success: true });
});

export default router;
