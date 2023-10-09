export const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(404).json({ error: "malformatted id" });
  }

  next(error);
};
