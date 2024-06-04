const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5020;
const DB = process.env.MONGO_URL;
const electionRoutes = require("./routes/electionsRoutes");
const cors = require('cors');

app.use(express.json());
app.use(cors());
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successfull");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

app.use("/api/elections", electionRoutes);

app.listen(5020, () => {
  console.log(`Server is running on port ${PORT}`);
});
