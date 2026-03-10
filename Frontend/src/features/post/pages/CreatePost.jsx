import React, { useState } from "react";
import "./createPost.scss";
import { usePost } from "../hooks/usePost";
import { NavLink, useNavigate } from "react-router";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const {loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("checkpoint 1")
    await handleCreatePost(image,caption);
    console.log("checkpoint 2")
    navigate('/');
  };

  if(loading){
    <main>
        <h1>
            Creating Post...
        </h1>
    </main>
  }

  return (
    <div className="create-post-page">
      <form className="create-post-card" onSubmit={handleSubmit}>
        <h2>Create Post</h2>

        <label className="image-upload">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <div className="upload-placeholder">
              <span>📷</span>
              <p>Click to upload image</p>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={200}
        />

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;