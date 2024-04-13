

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BlogForm from '../Blog/BlogForm';
import ErrorModal from '../../Utils/ErrorModal';
function EditBlog() {
    const [error, setError] = useState("");
    const [blog, setBlog]  = useState({});
    const {bid} = useParams();
    
    useEffect(() => {
        const fetchBlog = async( ) => {
            try{

                 const respose = await fetch(`http://localhost:5000/api/blog/${bid}`);
                 const blog = await respose.json();
                 setBlog(blog)
            }
            catch(err) {
                setError(err.message);
            }

        }
        fetchBlog();
    },[])
  return (
   < React.Fragment>
   {error && <ErrorModal isOpen={true} message={error} onClose={() => setError("")}></ErrorModal>}
    <BlogForm prevContent={blog.content} prevTitle={blog.title} blogId= {bid} isEdit></BlogForm>
    </React.Fragment>
  )
}

export default EditBlog