import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPostThunk, editPostThunk } from "../../store/post";

const PostForm = ({ post, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [caption, setCaption] = useState(post?.caption);
  const [video, setVideo] = useState(post?.video);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    post = {
      ...post,
      userId: sessionUser.id,
      caption,
      video,
    };

    if (formType === "CreatePost") {
      let createPost = await dispatch(createPostThunk(post));
      if (createPost) {
        history.push(`/posts/${createPost.post.id}`);
      }
    } else if (formType === "EditPost") {
      let editPost = await dispatch(editPostThunk(post));
      if (editPost) {
        history.push(`/posts/${post.id}`);
      }
    }

    const errors = {};
    if (caption === "") {
      errors.caption = "Caption is required";
    }
    if (video === "") {
      errors.video = "Video is required";
    }

    setErrors(errors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="post-form">
        <div>
            <h1>
              {formType === "CreatePost" ? "Upload video" : "Update Post"}
            </h1>
          <div className={formType === "EditPost" ? "hidden" : ""}>
            <div>
              <h4>Select a video to upload</h4>
              <h4 className="formErrors">{errors.video}</h4>
            </div>
            <label>
              <input
                type="test"
                placeholder="Video"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </label>
            <div></div>
            <h4>Caption</h4>
            <h4 className="formErrors">{errors?.caption}</h4>
          </div>
          <label>
            <textarea
              rows="4"
              cols="44"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </label>
          <div>
            <button
              className="post-button"
              type="submit"
              disabled={!!Object.values(errors).length}
            >
              {formType === "CreatePost" ? "Post" : "Update Post"}
            </button>
            <button className="discard-button">Discard</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
