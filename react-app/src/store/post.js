const GET_POSTS = "posts/GET_POSTS";
const CREATE_POST = "posts/CREATE_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "posts/DELETE_POST";
const CREATE_COMMENT = "posts/CREATE_COMMENT";
const EDIT_COMMENT = "posts/EDIT_COMMENT";
const DELETE_COMMENT = "posts/DELETE_COMMENT";
const CREATE_REPLY_COMMENT = "posts/CREATE_REPLY_COMMENT";
const EDIT_REPLY_COMMENT = "posts/EDIT_REPLY_COMMENT";
const DELETE_REPLY_COMMENT = "posts/DELETE_REPLY_COMMENT";

//action creator
const getPosts = (posts) => ({
  type: GET_POSTS,
  posts,
});

const createPost = (newPost) => ({
  type: CREATE_POST,
  newPost,
});

const editPost = (editPost) => ({
  type: EDIT_POST,
  editPost,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

const createReplyComment = (comment, postId, commentId) => ({
  type: CREATE_REPLY_COMMENT,
  comment,
  postId,
  commentId,
});

const editReplyComment = (comment) => ({
  type: EDIT_REPLY_COMMENT,
  comment,
});

const deleteReplyComment = (comment) => ({
  type: DELETE_REPLY_COMMENT,
  comment,
});

//Thunk Action Creators
export const fetchPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts");

  if (res.ok) {
    const { posts } = await res.json();
    dispatch(getPosts(posts));
  }
};

export const createPostThunk = (post) => async (dispatch) => {
  const response = await fetch("/api/posts/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const newPost = await response.json();
    await dispatch(createPost(newPost));
    return newPost;
  }
};

export const editPostThunk = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const editedPost = await response.json();
    dispatch(editPost(editedPost));
    return editedPost;
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deletePost(postId));
    return;
  }
};

export const createCommentThunk = (comment, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const newComment = await response.json();
    await dispatch(createComment(newComment));
    return newComment;
  }
};

export const editCommentThunk = (comment, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const editedComment = await response.json();
    dispatch(editComment(editedComment.comment));
    return editedComment.comment;
  }
};

export const deleteCommentThunk = (postId, commentId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(deleteComment(postId, comment));
  }
};

export const createReplyCommentThunk =
  (postId, commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}/replyComments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      const newComment = await response.json();
      await dispatch(createReplyComment(newComment, postId, commentId));
      return newComment;
    }
  };


export const editReplyCommentThunk =
  (comment, commentId) => async (dispatch) => {
    const response = await fetch(
      `/api/comments/${commentId}/replyComments/${comment.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      }
    );
    if (response.ok) {
      const editedComment = await response.json();
      dispatch(editReplyComment(editedComment.commentReply));
      return editedComment.commentReply;
    }
  };

export const deleteReplyCommentThunk =
  (commentId, replyCommentId) => async (dispatch) => {
    const response = await fetch(
      `/api/comments/${commentId}/replyComments/${replyCommentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const comment = await response.json();
      dispatch(deleteReplyComment(commentId, comment));
    }
  };

const initialState = {};

const postsReducer = (state = initialState, action) => {
  let newState = {};
  let postId;
  let post;
  let newPost;
  let index;
  switch (action.type) {
    case GET_POSTS:
      action.posts.forEach((post) => {
        newState[post.id] = post;
      });
      return newState;
    case CREATE_POST:
      newState = { ...state };
      newState[action.newPost.id] = action.newPost;
      return newState;
    case EDIT_POST:
      newState = { ...state };
      newState[action.editPost.id] = action.editPost;
      return newState;
    case DELETE_POST:
      newState = { ...state}
      delete newState[action.postId]
      return newState
    case CREATE_COMMENT:
      newState = { ...state };
      postId = action.comment.comment.postId;
      post = state[postId];
      newPost = { ...post };
      newState[postId] = newPost;
      newPost.comments = [...post.comments, action.comment.comment];
      return newState;
    case EDIT_COMMENT:
      newState = { ...state };
      postId = action.comment.postId;
      post = state[postId];
      newPost = { ...post };
      newState[postId] = newPost;
      index = post.comments.findIndex(
        (comment) => comment.id === action.comment.id
      );
      newPost.comments = [...post.comments];
      newPost.comments[index] = action.comment;
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      postId = action.comment;
      post = state[postId];
      newPost = { ...post };
      newState[postId] = newPost;
      index = post.comments.findIndex(
        (comment) => comment.id === action.comment.id
      );
      newPost.comments = [...post.comments];
      newPost.comments.splice(index, 1);
      return newState;
    case CREATE_REPLY_COMMENT:
      newState = { ...state };
      postId = action.postId;
      post = newState[postId];

      const commentIndex = post.comments.findIndex(
          (comment) => comment.id === action.commentId)

      const comment = post.comments[commentIndex];
      comment.commentReply.push(action.comment.commentReply);

      return newState;
    // case EDIT_REPLY_COMMENT:
    //   newState = { ...state };
    //   commentId = action.comment.commentId;
    //   post = newState[commentId];
    //   newPost = { ...post };
    //   // console.log("post",newPost)
    //   newState[commentId] = newPost;
    //   // console.log(newPost);
    //   index = newPost.comments.findIndex(
    //     (reply) => reply.id === action.comment.id
    //   );
    //   newPost.comments = [...post.comments];
    //   newPost.comments[index] = action.comment;
    //   return newState;
    case DELETE_REPLY_COMMENT:
      newState = { ...state };
      console.log(action.comment)
      postId = action.comment.commentId;
      post = newState[postId];
      newPost = { ...post };
      newState[postId] = newPost;
      index = post.comments.findIndex((reply) => reply.id === action.comment.id);
      newPost.comments = [...post.comments];
      newPost.comments.splice(index, 1);
    default:
      return state;
  }
};

export default postsReducer;
