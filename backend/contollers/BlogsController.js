
const User = require("../model/User")
const Blog = require("../model/Blogs");

const getAllBlogs = async(req, res) => {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs)
}

const getBlogsByUserId = async(req, res) => {
  const {uid} = req.params;
  try{
    const user = await User.findById(uid).populate('blogs');
    if(!user) {
      return res.status(404).json({message : "Unable to find the User"});
    }
    const blogs = user.blogs;
    
    return res.status(200).json(blogs);
    
  }
  catch(err) {
    res.status(500).json({message : err.message});
  }
}
const getBlogById = async(req, res) => {
  const {bid} = req.params;
  try{
    const blog = await Blog.findById(bid);
    if(!blog) {
      return res.status(404).json({message : "Unable to find the blog"});
    }
    res.status(200).json(blog);
  }
  catch(err) {
    res.status(500).json({message : err.message});
  }
}

const createBlog = async (req, res) => {
  const { title, content, creator, author, date } = req.body;

  try {
    const user = await User.findById(creator);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBlog = new Blog({ title, content, creator , author, date});
    await newBlog.save();

    user.blogs.push(newBlog);
    await user.save();

    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlog = async(req, res) => {
  const {title, content, creator} = req.body;

  const {bid} = req.params;
  const data = await Blog.findById(bid);
  console.log(data);
  if(creator != data.creator) {
    return res.status(401).json({message : "Unauthorized"});
  }
  const blog = {
    title,
    content
  }
  try{

    const updatedBlog = await Blog.findByIdAndUpdate(bid, blog, {new : true});
    if(!updatedBlog) {
      return res.status(402).json({message : "no blog found"});
    }
    res.status(200).json(updatedBlog);
  }
  catch(err) {
    res.status(500).json({message : " Unable to update"});
  }
}

const deleteBlog = async (req, res) => {
  const { bid } = req.params;
  console.log(bid)
  const data = await Blog.findById(bid).populate("creator");
  console.log(data);
  try {
    const blog = await Blog.findById(bid).populate("creator");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await blog.creator.blogs.pull(bid);
    await blog.creator.save();
    await blog.deleteOne();

    res.status(200).json(blog);
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


  module.exports = {
    getAllBlogs,
    deleteBlog,
    createBlog,
    updateBlog,
    getBlogById,
    getBlogsByUserId
  }