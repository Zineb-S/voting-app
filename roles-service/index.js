const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5030;
const DB = process.env.MONGO_URL;
;
const roleRoutes = require("./routes/roleRoutes");

app.use(express.json());

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

 app.use("/api/roles", roleRoutes);

app.listen(5010, () => {
  console.log(`Server is running on port ${PORT}`);
});
