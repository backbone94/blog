import express from "express";

// 몽고 DB 콜렉션
import User from "../../models/user";

const router = express.Router();

// GET api/auth
router.get("/", async (req, res) => {
  const { email, password } = req.query;
  console.log("email: ", email, " password: ", password);
  const result = await User.findOne({ email, password });
  if (result === null) {
    console.log("이메일 또는 비밀번호를 확인하세요.");
    res.json({ error: "이메일 또는 비밀번호를 확인하세요." });
  } else {
    console.log(result, "account Get");
    res.json(result);
  }
});

// POST api/auth
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log("name: ", name, " email: ", email, " password: ", password);

    const result = await User.findOne({ email });
    if (result !== null) {
      console.log("이미 존재하는 이메일입니다.");
      res.json({ error: "이미 존재하는 이메일입니다." });
    } else {
      const newAccount = await User.create({
        name,
        email,
        password,
      });
      console.log("계정 생성 result: ", newAccount);
      res.json(newAccount);
    }
  } catch (e) {
    console.log(e);
  }
});

// POST api/auth/updateAccount
router.post("/updateAccount", async (req, res, next) => {
  try {
    const { name, profileImage, newPassword, email } = req.body;
    console.log(
      "name: ",
      name,
      " profileImage: ",
      profileImage,
      " newPassword: ",
      newPassword
    );
    const newAccount = await User.findOneAndUpdate(
      { email },
      { name, profile: profileImage, password: newPassword },
      { new: true }
    );
    console.log("계정 수정 result: ", newAccount);
    res.json(newAccount);
  } catch (e) {
    console.log(e);
  }
});

export default router;
