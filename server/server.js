// it will Load environment variables from the .env file.
// imp :- This must happen before we access process.env values.
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`CareerCompass server running on port ${PORT}`);
});