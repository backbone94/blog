import express from "express";

// 몽고 DB 콜렉션
import Folder from "../../models/folder";

const router = express.Router();

// S3 & AWS 설정
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: "my-blog1684/upload",
    region: "ap-northeast-2",
    key(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

// POST api/folder/image. S3에 이미지 저장
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ upload: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ upload: false, url: null });
  }
});

// GET api/folder
router.get("/", async (req, res) => {
  console.log("req.query.category: ", req.query.category);
  const result = await Folder.find({ category: req.query.category });
  console.log(result, "All Folder Get");
  res.json(result);
});

// POST api/folder
router.post("/", uploadS3.none(), async (req, res, next) => {
  try {
    const { title, fileUrl, category } = req.body;
    console.log("title: ", title, "category:", category);
    const result = await Folder.findOne({ title: title, category: category });
    console.log("result", result);
    if (result !== null) {
      console.log("이미 존재하는 폴더입니다.");
      res.json({ error: "이미 존재하는 폴더입니다." });
    } else {
      const newFolder = await Folder.create({
        title,
        fileUrl,
        category,
      });
      res.json(newFolder);
    }
  } catch (e) {
    console.log(e);
  }
});

// DELETE api/folder
router.delete("/", async (req, res) => {
  console.log("req.body: ", req.body);
  await Folder.deleteOne({
    id: req.body.id,
  });
  res.json({ success: true });
});

export default router;
