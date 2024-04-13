
const express = require("express");
const BlogsController = require("../contollers/BlogsController");
const router = express.Router();


router.get("/blogs", BlogsController.getAllBlogs);
router.get("/myblogs/:uid", BlogsController.getBlogsByUserId)
router.post("/create",BlogsController.createBlog);
router.get("/:bid", BlogsController.getBlogById);
router.patch("/:bid", BlogsController.updateBlog);
router.delete("/:bid", BlogsController.deleteBlog)

module.exports = router;