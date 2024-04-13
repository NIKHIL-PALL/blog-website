import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../Blog/BlogCard";
import AuthContext from "../../Contexts/AuthContext";
import logo from "../../logo.svg";
import ErrorModal from "../../Utils/ErrorModal";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const auth = useContext(AuthContext);
  const handleOnDelete = (blogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
  }
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blog/myblogs/${auth.userId}`
        );
        const result = await response.json();
        if (!response.ok) {
          setError(result.message);
          return;
        }
        setBlogs(result);
      } catch (err) {
        setError(err.message);
      }
    };
    if (!auth.isLoggedIn) {
      setError("Please Sign Up / Login First.");
    } else {
      fetchBlogs();
    }
  }, []);
  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          isOpen={true}
          onClose={() => setError("")}
          message={error}
        />
      )}
      <section
        id="blog-section "
        className="flex flex-wrap gap-7 justify-center items-center"
      >
        {!auth.isLoggedIn && (
          <Link
            to="/blog"
            className="p-4 mx-2 my-5 bg-black text-white rounded-md"
          >
            Signup/Login
          </Link>
        )}
        {blogs.length === 0 && auth.isLoggedIn && (
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-3xl m-9 p-8">
              You do not have any blogs. Try writing a new Blog.
            </h1>
            <Link
              to="/create"
              className="p-4 mx-2 my-5 bg-black text-white rounded-md self-center text-center"
            >
              Write a Blog
            </Link>
          </div>
        )}

        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            content={blog.content}
            date={blog.date}
            author={blog.author}
            image={logo}
            creator={blog.creator}
            blogId={blog._id}
            onDelete={handleOnDelete}
          ></BlogCard>
        ))}
      </section>
    </React.Fragment>
  );
}

export default MyBlogs;
