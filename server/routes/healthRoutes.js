const express = require("express"); // it will Import the Express framework to create a router instance.
const { getHealth } = require("../controllers/healthController");

const router = express.Router(); // it will Create a new router instance to define routes for the health check endpoint.

/*
 * Health-check route.
 * This endpoint does not require auth. because
 * it is used to verify whether the server is running.
 * we create a separate route file for health check to keep the code organized and maintainable.
 *  bcz as the application grows, we may have multiple routes and controllers, and separating them into different files helps to keep the codebase clean and manageable.
 */
/*
 * Route responsibility:
 * Decide which controller should handle the request.
 *
 * The route itself should stay lightweight.
 */
router.get("/", getHealth);

module.exports = router;