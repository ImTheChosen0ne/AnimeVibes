import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../../pages/PostFormPage";
import { fetchPosts } from "../../store/post";

function EditPostForm() {
  const { postId } = useParams();

  const post = useSelector((state) => state.posts[postId]);

  const dispatch = useDispatch();


  return (
    <div>
      <PostForm post={post} formType="EditPost" />
    </div>
  );
}

export default EditPostForm;
