function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // pasa al siguiente handler o middleware
}

module.exports = logger;
