/*
 * Controller Layer
 * it handle HTTP-related work:
 * - Reading request data
 * - Calling the appropriate service
 * - Sending the HTTP response
 *  - A controller is basically the bridge between HTTP and application logic. {imp concept}
 * Business logic should not live here.
 */

const healthService = require("../services/healthService");
const { successResponse } = require("../utils/apiResponse");

const getHealth = (req, res) => {
  // Ask the service for the current application status.
  const serverStatus = healthService.getServerStatus();

  res.status(200).json({
    success: true,
    message: "CareerCompass server is running",
    data: serverStatus,
  });
};

module.exports = {
  getHealth,
};