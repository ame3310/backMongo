const userService = require("./user.service");

const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const imagePath = req.file?.path;
    if (!imagePath) {
      return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    const updated = await userService.updateAvatar(req.user.id, imagePath);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const follow = async (req, res) => {
  try {
    const result = await userService.followUser(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const result = await userService.unfollowUser(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const followers = async (req, res) => {
  try {
    const data = await userService.getFollowers(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;
    const results = await userService.searchUsers(q);
    res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProfile,
  uploadAvatar,
  follow,
  unfollow,
  followers,
  search,
};
