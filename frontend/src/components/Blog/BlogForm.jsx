import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom"
import getDate from "../../Utils/date-formatter"
const BlogForm = ({prevTitle = "", prevContent = "", isEdit, blogId}) => {
    const[title , setTitle] = useState(prevTitle);
    const [content , setContent] = useState(prevContent);
    const auth  = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit =async (event) => {
        
        event.preventDefault();

        if(isEdit) {
          try{
            const response = await fetch(`http://localhost:5000/api/blog/${blogId}`, {
              method : "PATCH",
              headers : {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                title,
                content,
                creator : auth.userId
              })
            })
            navigate('/myblogs');
          }
          catch(err) {
            console.log(err);
            console.log(err.message);
          }
        }
        else{

      
        const response = await fetch(`http://localhost:5000/api/user/${auth.userId}`);
        const result = await response.json();

        const blog = await fetch(`http://localhost:5000/api/blog/create`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                title,
                content,
                creator : auth.userId,
                author : result.name,
                date : getDate()
            })
        })
        navigate("/");
      }

    }
    useEffect(() => {
      setTitle(prevTitle)
      setContent(prevContent)
    }, [prevTitle, prevContent])
   
  return (
    <React.Fragment>
        <form onSubmit={handleSubmit}>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
          rows={15} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            placeholder="Enter content" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <input
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="Submit"
            readOnly
            value={isEdit ? "Update" : "Submit"}
          />
           
        </div>
      </div>
      </form>
    </React.Fragment>
  );
};

export default BlogForm;
