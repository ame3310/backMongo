const validatePostData = ({ title, content }) => {
  if (!title || !content) {
    throw new Error("Título y contenido son obligatorios");
  }
};

module.exports = { validatePostData };
