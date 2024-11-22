const app = require("./src/app");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server

app.listen(PORT,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
