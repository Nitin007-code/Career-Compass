/*
 * Validation Middleware
 * Client-side validation improves user experience, but
 * server-side validation is essential because requests can
 * be sent directly to our API.
 *
 * This middleware gives us a reusable place to validate
 * incoming request data.
 */

const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => {
      const value = req.body[field];

      // Treat empty strings, null and undefined as missing.
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
        errors: missingFields.map((field) => ({
          field,
          message: `${field} is required`,
        })),
      });
    }

    next();
  };
};

module.exports = {
  validateRequiredFields,
};