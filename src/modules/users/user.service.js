const User = require("./user.model");

const getProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("followers", "username email")
    .populate("following", "username email");

  if (!user) throw new Error("Usuario no encontrado");

  const validFollowers = user.followers.filter(Boolean);
  const followerIds = validFollowers.map((u) => u._id);

  const validFollowing = user.following.filter(Boolean);
  const followingIds = validFollowing.map((u) => u._id);

  if (
    followerIds.length !== user.followers.length ||
    followingIds.length !== user.following.length
  ) {
    await User.findByIdAndUpdate(userId, {
      followers: followerIds,
      following: followingIds,
    });
  }

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    followers: validFollowers,
    following: validFollowing,
  };
};

const updateAvatar = async (userId, avatarPath) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  user.avatar = avatarPath;
  await user.save();

  return { message: "Avatar actualizado correctamente", avatar: user.avatar };
};

const followUser = async (userId, targetId) => {
  if (userId === targetId) throw new Error("No puedes seguirte a ti mismo");

  const user = await User.findById(userId);
  const target = await User.findById(targetId);
  if (!target) throw new Error("Usuario a seguir no encontrado");

  if (target.followers.includes(userId)) {
    throw new Error("Ya sigues a este usuario");
  }

  user.following.push(targetId);
  target.followers.push(userId);

  await user.save();
  await target.save();

  return { message: "Usuario seguido correctamente" };
};

const unfollowUser = async (userId, targetId) => {
  const user = await User.findById(userId);
  const target = await User.findById(targetId);
  if (!target) throw new Error("Usuario a dejar de seguir no encontrado");

  user.following = user.following.filter((id) => !id.equals(targetId));
  target.followers = target.followers.filter((id) => !id.equals(userId));

  await user.save();
  await target.save();

  return { message: "Has dejado de seguir al usuario" };
};

const getFollowers = async (userId) => {
  const user = await User.findById(userId).populate(
    "followers",
    "username email"
  );
  if (!user) throw new Error("Usuario no encontrado");

  const validFollowers = user.followers.filter(Boolean);
  const validIds = validFollowers.map((f) => f._id);

  if (validIds.length !== user.followers.length) {
    await User.findByIdAndUpdate(userId, { followers: validIds });
  }

  return validFollowers;
};

const searchUsers = async (query) => {
  if (!query) throw new Error("Debe proporcionar un parámetro de búsqueda");

  const users = await User.find({
    $or: [
      { username: { $regex: query, $options: "i" } },
      { _id: query.match(/^[a-f\d]{24}$/i) ? query : null },
    ],
  }).select("username email avatar");

  return users;
};

module.exports = {
  getProfile,
  updateAvatar,
  followUser,
  unfollowUser,
  getFollowers,
  searchUsers,
};
