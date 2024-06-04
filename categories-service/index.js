const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 5010;
const DB = process.env.MONGO_URL;

const categoryRoutes = require("./routes/categoryRoutes");
app.use(cors());
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


app.use("/api/categories", categoryRoutes) ;

app.listen(5010, () => {
  console.log(`Server is running on port ${PORT}`);
});
