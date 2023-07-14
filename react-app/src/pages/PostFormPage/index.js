import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPostThunk, editPostThunk } from "../../store/post";
import "./PostForm.css";

const PostForm = ({ post, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [caption, setCaption] = useState(post?.caption);
  const [video, setVideo] = useState(post?.video);
  const [videoLoading, setVideoLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", sessionUser.id);
    formData.append("video", video);
    formData.append("caption", caption);

    setVideoLoading(true);

    post = {
      ...post,
      userId: sessionUser.id,
      caption,
      video,
    };

    const errors = {};
    if (caption === "") {
      errors.caption = "Caption is required";
    }
    if (caption.length > 255) {
      errors.caption = "Comment can not have more than 250 characters";
    }
    if (video === "") {
      errors.video = "Video is required";
    }
    // if (video && !video.endsWith(".mp4")) {
    //   errors.video = "Video URL must end in .mp4";
    // }
    // if (video && !video.startsWith("http")) {
    //   errors.video = "Video must be in URL Format";
    // }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (formType === "CreatePost") {
        let createPost = await dispatch(createPostThunk(formData));
        if (createPost) {
          history.push(`/posts/${createPost.post.id}`);
        }
      } else if (formType === "EditPost") {
        let editPost = await dispatch(editPostThunk(post));
        if (editPost) {
          history.push(`/posts/${post.id}`);
        }
      }
    }
  };

  return (
    <div className="create-update">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="post-form"
      >
        <div>
          <h1>{formType === "CreatePost" ? "Upload video" : "Update Post"}</h1>
          <h3>
            {formType === "CreatePost"
              ? "Post a video to your account"
              : "Update a video in your account"}
          </h3>
          <div className="form">
            <div>
              <div>
                <h4>
                  {formType === "CreatePost"
                    ? "Select a video to upload"
                    : "Select a video to update current post"}
                </h4>
                <h4 className="formErrors">{errors.video}</h4>
              </div>
              <label>
                <input
                  type="file"
                  placeholder="Video"
                  accept="video/*"
                  // value={video}
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </label>
            </div>
            <h4>Caption</h4>
            <h4 className="formErrors">{errors?.caption}</h4>
            <label>
              <textarea
                rows="4"
                cols="44"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </label>
            <div className="form-buttons">
              <div className="post-button">
                <button className="post-button" type="submit">
                  {formType === "CreatePost" ? "Post" : "Update Post"}
                </button>
              </div>
              <div className="discard-button">
                <button
                  className="discard-button"
                  onClick={() => history.push("/")}
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
