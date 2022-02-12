import express from "express";

// Model
import Post from "../../models/post";

import auth from "../../middleware/auth";

const router = express.Router();

// api/post
router.get("/", async (req, res) => {
  const result = await Post.find();
  console.log(result, "All Post Get");
  res.json(result);
});

router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req, "req");
    const { title, contents, fileUrl, creator } = req.body;
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

export default router;
