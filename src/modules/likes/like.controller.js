const { toggleLike } = require("./like.service");

const togglePostLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await toggleLike(id, userId, "post");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const toggleCommentLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await toggleLike(id, userId, "comment");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  togglePostLike,
  toggleCommentLike,
};
