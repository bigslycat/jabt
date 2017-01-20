export default ({
  index = ['/', '/index.html'],
  locals,
  render,
  req,
  res,
  next,
}) => () => {
  if (index.includes(req.path)) res.send(render(locals));
  next();
};
