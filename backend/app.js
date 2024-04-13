const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express(); 
const User = require("./model/User");
const UserRoutes = require("./routes/UserRoutes");
const BlogRoutes = require("./routes/BlogRoutes")

dotenv.config();
app.use(cors());
app.use(express.json())
app.use("/api/user", UserRoutes);
app.use("/api/blog", BlogRoutes);

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connection to the mongodb was successful");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
