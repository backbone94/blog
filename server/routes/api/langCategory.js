import express from "express";

// 몽고 DB 콜렉션
import LangCategory from "../../models/langCategory";

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

// POST api/langCategory/image. S3에 이미지 저장
router.post("/image", uploadS3.array("upload", 5), async (req, res, next) => {
  try {
    console.log(req.files.map((v) => v.location));
    res.json({ upload: true, url: req.files.map((v) => v.location) });
  } catch (e) {
    console.error(e);
    res.json({ upload: false, url: null });
  }
});

// GET api/langCategory
router.get("/", async (req, res) => {
  const result = await LangCategory.find();
  console.log(result, "All Category Get");
  res.json(result);
});

// POST api/langCategory
router.post("/", uploadS3.none(), async (req, res, next) => {
  try {
    const { title, fileUrl } = req.body;
    const newPost = await LangCategory.create({
      title,
      fileUrl,
    });
    res.json(newPost);
  } catch (e) {
    console.log(e);
  }
});

// POST api/langCategory/addCollection
router.post("/addCollection", uploadS3.none(), async (req, res, next) => {
  try {
    const title = req.body;
    await LangCategory.create({
      title,
      fileUrl,
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
