const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/auth.middleware");
const { isCommentAuthor } = require("../auth/auth.middleware");
const upload = require("../../middlewares/upload.middleware");
const { create, getByPost, update, remove } = require("./comment.controller");

router.post("/:postId", verifyToken, upload.single("image"), create);
router.get("/post/:postId", getByPost);
router.put(
  "/:id",
  verifyToken,
  isCommentAuthor,
  upload.single("image"),
  update
);
router.delete("/:id", verifyToken, isCommentAuthor, remove);

module.exports = router;
