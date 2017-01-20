export default ({
  hotMiddleware,
  templateMiddleware,
  req,
  res,
}) => () => hotMiddleware(req, res, templateMiddleware);
