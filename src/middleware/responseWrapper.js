module.exports = (req, res, next) => {
  const oldJson = res.json.bind(res);
  res.json = (payload) => {
    if (payload && typeof payload === "object" && "success" in payload) {
      return oldJson(payload);
    }
    return oldJson({ success: true, data: payload, error: null });
  };
  next();
};
