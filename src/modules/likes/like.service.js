const Like = require("./like.model");
const Post = require("../posts/post.model");
const Comment = require("../comments/comment.model");

/**
 * @param {string} targetId
 * @param {string} userId
 * @param {"post"|"comment"} type
 * @returns {Object}
 */
const toggleLike = async (targetId, userId, type) => {
  if (!["post", "comment"].includes(type)) {
    throw new Error("Tipo inválido");
  }

  const Model = type === "post" ? Post : Comment;
  const exists = await Model.findById(targetId);
  if (!exists)
    throw new Error(`${type === "post" ? "Post" : "Comentario"} no encontrado`);

  const filter = { user: userId };
  if (type === "post") filter.post = targetId;
  if (type === "comment") filter.comment = targetId;

  const existing = await Like.findOne(filter);

  if (existing) {
    await existing.deleteOne();
    return { liked: false, message: `Like eliminado del ${type}` };
  } else {
    const newLike = { user: userId };
    if (type === "post") newLike.post = targetId;
    if (type === "comment") newLike.comment = targetId;

    await Like.create(newLike);
    return { liked: true, message: `Like agregado al ${type}` };
  }
};

module.exports = { toggleLike };
