const errorHandler = (err, req, res, next) => {
  let status;

  status = res.statusCode ? res.statusCode : 500;

  res.status(500);
  res.json({ message: err.message, isError: true });
};

export default errorHandler;
