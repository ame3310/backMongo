const express = require("express");
const router = express.Router();
const { togglePostLike, toggleCommentLike } = require("./like.controller");
const verifyToken = require("../auth/auth.middleware");

router.post("/post/:id", verifyToken, togglePostLike);
router.post("/comment/:id", verifyToken, toggleCommentLike);

module.exports = router;
