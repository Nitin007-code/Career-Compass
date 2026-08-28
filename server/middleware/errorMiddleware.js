/*
 * Centralized Error Middleware
  
 * Instead of handling errors separately in every route,
 * we can send unexpected errors through one common handler.
 
 * Express recognizes this as an error middleware because
 * it receives 4 arguments: err, req, res, next.
 */

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;