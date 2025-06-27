const jwt = require("jsonwebtoken");
const Comment = require("../comments/comment.model");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

const isCommentAuthor = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    if (comment.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para modificar este comentario" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: "Error en la autorización" });
  }
};

module.exports = verifyToken;
module.exports.isCommentAuthor = isCommentAuthor;
