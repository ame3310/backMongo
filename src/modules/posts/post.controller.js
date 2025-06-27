const postService = require("./post.service");

const create = async (req, res) => {
  try {
    const image = req.file?.filename;
    const post = await postService.createPost(req.body, req.user.id, image);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const image = req.file?.filename;
    const post = await postService.updatePost(
      req.params.id,
      req.user.id,
      req.body,
      image
    );
    res.json(post);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  const { page = 1 } = req.query;
  const posts = await postService.getAllPosts(Number(page));
  res.json(posts);
};

const getById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const searchByTitle = async (req, res) => {
  const { q } = req.query;
  const posts = await postService.searchPostByTitle(q);
  res.json(posts);
};

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  searchByTitle,
};
