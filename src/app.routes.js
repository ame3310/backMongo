const express = require("express");
const router = express.Router();

router.use("/auth", require("./modules/auth/auth.routes"));
router.use("/users", require("./modules/users/user.routes"));
router.use("/posts", require("./modules/posts/post.routes"));
router.use("/comments", require("./modules/comments/comment.routes"));
router.use("/likes", require("./modules/likes/like.routes"));

module.exports = router;
