import React from "react";
import PostForm from "../../pages/PostFormPage";

const CreatePostForm = () => {

  const post = {
    caption: "",
    video: "",
  }

  return (
        <PostForm post={post} formType="CreatePost"/>
  )
}

export default CreatePostForm
