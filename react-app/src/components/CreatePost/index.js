import React from "react";
import PostForm from "../../pages/PostFormPage";

const CreatePostForm = () => {

  const post = {
    caption: "",
    video: "",
  }

  return (
    <div>
        <PostForm post={post} formType="CreatePost"/>
    </div>
  )
}

export default CreatePostForm
