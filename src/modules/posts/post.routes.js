const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/auth.middleware");
const upload = require("../../middlewares/upload.middleware"); 

const {
  create,
  update,
  remove,
  getAll,
  getById,
  searchByTitle,
} = require("./post.controller");

router.get("/", getAll);
router.get("/search", searchByTitle);
router.get("/:id", getById);

router.post("/", verifyToken, upload.single("image"), create);
router.put("/:id", verifyToken, upload.single("image"), update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
