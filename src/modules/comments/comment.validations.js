const validateCommentData = ({ content }) => {
  if (!content) {
    throw new Error("El contenido del comentario es obligatorio");
  }
};

module.exports = { validateCommentData };
