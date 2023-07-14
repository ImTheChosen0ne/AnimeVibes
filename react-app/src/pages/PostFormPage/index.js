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
  const [videoName, setVideoName] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setVideo(file);
    setVideoName(file.name);
    const videoObjectURL = URL.createObjectURL(file);
    setVideoPreview(videoObjectURL);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setVideo(file);
    setVideoName(file.name);
    const videoObjectURL = URL.createObjectURL(file);
    setVideoPreview(videoObjectURL);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearVideo = () => {
    const fileInput = document.getElementById("videoInput");
    fileInput.value = null;
    setVideo(null);
    setVideoName("");
    setVideoPreview(null);
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
              {/* <div>
                <h4>
                  {formType === "CreatePost"
                    ? "Select a video to upload"
                    : "Select a video to update current post"}
                </h4>
                <h4 className="formErrors">{errors.video}</h4>
              </div> */}
              <label>
                <h4 className="formErrors">{errors.video}</h4>
                <div
                  className="drop-zone"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {videoPreview ? (
                    <div>
                      <video
                        src={videoPreview}
                        className="video-preview"
                        controls
                        autoPlay
                        muted
                      />
                      <button
                        className="change-video-button"
                        onClick={clearVideo}
                      >
                        Change Video
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>Drag and drop a video file here</p>
                      <p className="select-file">or select a file</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="videoInput"
                    accept="video/*"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                </div>
              </label>
            </div>
            <div className="caption-info">
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
        </div>
      </form>
    </div>
  );
};

export default PostForm;
