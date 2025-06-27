const commentService = require("./comment.service");

const create = async (req, res) => {
  try {
    const postId = req.params.postId;
    const imagePath = req.file ? req.file.path : null;
    const comment = await commentService.createComment(
      req.body,
      req.user.id,
      postId,
      imagePath
    );
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getByPost = async (req, res) => {
  try {
    const comments = await commentService.getCommentsByPost(req.params.postId);
    res.json(comments);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const updated = await commentService.updateComment(
      req.params.id,
      req.user.id,
      req.body,
      imagePath
    );
    res.json(updated);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await commentService.deleteComment(
      req.params.id,
      req.user.id
    );
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = {
  create,
  getByPost,
  update,
  remove,
};
