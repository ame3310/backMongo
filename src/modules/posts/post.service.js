const Post = require("./post.model");
const { validatePostData } = require("./post.validations");

const createPost = async (data, userId, image) => {
  validatePostData(data);
  const post = await Post.create({
    ...data,
    author: userId,
    ...(image && { image }),
  });
  return post;
};

const updatePost = async (postId, userId, data, image) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post no encontrado");
  if (!post.author.equals(userId)) throw new Error("No autorizado");

  Object.assign(post, data);
  if (image) post.image = image;
  await post.save();
  return post;
};

const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post no encontrado");
  if (!post.author.equals(userId)) throw new Error("No autorizado");

  await post.remove();
  return { message: "Post eliminado correctamente" };
};

const getAllPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const posts = await Post.find()
    .populate("author", "username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findById(id).populate("author", "username email");
  if (!post) throw new Error("Post no encontrado");
  return post;
};

const searchPostByTitle = async (query) => {
  const posts = await Post.find({
    title: { $regex: query, $options: "i" },
  }).populate("author", "username");
  return posts;
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  searchPostByTitle,
};
