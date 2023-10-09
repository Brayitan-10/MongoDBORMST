export const unknowunEnpoint = (req, res, next) => {
  res.status(404).json({ error: "unknown endpoint" });
};
