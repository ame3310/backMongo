const Comment = require("./comment.model");
const Post = require("../posts/post.model");
const { validateCommentData } = require("./comment.validations");

const createComment = async (data, userId, postId, imagePath) => {
  validateCommentData(data);

  const postExists = await Post.findById(postId);
  if (!postExists) throw new Error("Post no encontrado");

  const comment = await Comment.create({
    content: data.content,
    author: userId,
    post: postId,
    image: imagePath || null,
  });

  return comment;
};

const getCommentsByPost = async (postId) => {
  const comments = await Comment.find({ post: postId })
    .populate("author", "username")
    .sort({ createdAt: -1 });

  return comments;
};

const updateComment = async (commentId, userId, data, imagePath) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comentario no encontrado");
  if (!comment.author.equals(userId)) throw new Error("No autorizado");

  comment.content = data.content || comment.content;
  if (imagePath) {
    comment.image = imagePath;
  }

  await comment.save();
  return comment;
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comentario no encontrado");
  if (!comment.author.equals(userId)) throw new Error("No autorizado");

  await comment.deleteOne();
  return { message: "Comentario eliminado correctamente" };
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
