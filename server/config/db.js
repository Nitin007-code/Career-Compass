// we created this to sep. database logic from our server.js
const mongoose = require("mongoose");

// Connect the appli. to MongoDB.
//   The connection string is stored in an environment variable so db credentials are never hard-coded in src code.
 
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    // Stop the server because the appli. depends on the database.
    process.exit(1);
  }
};

module.exports = connectDB;