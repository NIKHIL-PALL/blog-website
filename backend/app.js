const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const cors = require("cors");
const app = express(); 
const UserRoutes = require("./routes/UserRoutes");
const BlogRoutes = require("./routes/BlogRoutes")
const multer = require("multer");
const path = require("path");
const User = require('./model/User')
const Blog = require('./model/Blogs')
const BlogsController = require('./contollers/BlogsController')
dotenv.config();
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
app.use("/api/user", UserRoutes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

app.post("/api/blog/create",upload.single('file'), BlogsController.createBlog);
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
