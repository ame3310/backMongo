const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/auth.middleware");
const upload = require("../../middlewares/upload.middleware");
const {
  getProfile,
  uploadAvatar,
  follow,
  unfollow,
  followers,
  search,
} = require("./user.controller");

router.get("/me", verifyToken, getProfile);
router.put("/avatar", verifyToken, upload.single("image"), uploadAvatar);

router.post("/follow/:id", verifyToken, follow);
router.post("/unfollow/:id", verifyToken, unfollow);
router.get("/followers/:id", verifyToken, followers);

router.get("/search", search);

module.exports = router;
