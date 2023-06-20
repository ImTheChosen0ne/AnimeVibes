import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostForm from "../../pages/PostFormPage";


function EditPostForm() {
  const { postId } = useParams();

  const post = useSelector((state) => state.posts[postId]);

  return (
    <div>
      <PostForm post={post} formType="EditPost" />
    </div>
  );
}

export default EditPostForm;
