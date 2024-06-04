const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');
dotenv.config();
connectDB();

const app = express();
const PORT = 5040;
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
