import express from "express";

// 몽고 DB 콜렉션
import Category from "../../models/category";

const router = express.Router();

// GET api/category
router.get("/", async (req, res) => {
  const result = await Category.find();
  console.log(result, "All Category Get");
  res.json(result);
});

// POST api/category
router.post("/", async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    const { title } = req.body;

    const result = await Category.findOne({ title });
    console.log("카테고리 추가 result: ", result);
    if (result !== null) {
      console.log("이미 존재하는 카테고리입니다..");
      res.json({ error: "이미 존재하는 카테고리입니다." });
    } else {
      const newFolder = await Category.create({
        title,
      });
      res.json(newFolder);
    }
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/category
router.delete("/", async (req, res) => {
  console.log("req.body: ", req.body);
  await Category.deleteOne({
    title: req.body.title,
  });
  res.json({ success: true });
});

export default router;
