import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";

// appwrite me $id se id lega
const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-blue-200 rounded-xl p-4">
        <div className="w-full justify-center">
          <img
            className="rounded-xl "
            src={appwriteService.filePreview(featuredImage)}
            alt=""
            srcset=""
          />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
