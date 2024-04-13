

import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import logo from "../../logo.svg";
import ErrorModal from '../../Utils/ErrorModal';


function Blog() {
  const[error, setError] = useState("");
  const[blogs , setBlogs] = useState([]);

  const handleOnDelete = (blogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId))
   }
  const fetchBlogs = async () => {
    try{

      const repsonse = await fetch(`http://localhost:5000/api/blog/blogs`);
      const result = await repsonse.json();
      if(!repsonse.ok) {
        setBlogs([]);
        console.log("No data found");
        throw new Error();
        // return ;
      }
      
      setBlogs(result);
      setError("");

    }
    catch(err) {
      console.log(err);
      setError("Unable to fetch Blogs this time.")
    }
    
  }
  useEffect(() => {
    const fetchBlogsData = async ()=> {

      await fetchBlogs();
    }
    fetchBlogsData();
  }, [blogs]);
   
  return (
    <section id='blog-section ' className='flex flex-wrap gap-7 justify-center items-center'>
      {error && <ErrorModal errorText = {error}/>}
      {!error && blogs.map( blog => <BlogCard key={blog._id} onDelete={handleOnDelete} title={blog.title} content={blog.content} author={blog.author} date={blog.date} image={logo} creator={blog.creator} blogId = {blog._id}></BlogCard>)}
    </section>
  )
}

export default Blog