import React, { useContext, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ConfirmationModal from "../../Utils/ConfirmationModal";
const BlogCard = ({
  title,
  author,
  date,
  image,
  content,
  creator,
  blogId,
  onDelete,
}) => {
  const auth = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blog/${blogId}`, {
        method: "DELETE",
      });
      onDelete(blogId);
      setModal(false);
      // navigate("/myblogs")
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(blogId)
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      {modal && (
        <ConfirmationModal
          isOpen
          title={"Do you want to delete?"}
          message={"You cannot restore deleted blogs."}
          onConfirm={handleDelete}
          onCancel={() => setModal(false)}
        />
      )}
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {content && content.substring(0, 110)}{" "}
          <a href="#" className="text-cyan-700 ">
            Read more
          </a>
        </p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {author}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {date}
        </span>
      </div>
      {auth.userId === creator && (
        <div>
          <Link
            to={`/edit/${blogId}`}
            className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </Link>
          <button
            onClick={() => setModal(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
