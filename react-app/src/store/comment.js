// const GET_COMMENTS = "comments/GET_COMMENTS"
// const CREATE_COMMENT = "comments/CREATE_COMMENT"
// const EDIT_COMMENT = "comments/EDIT_COMMENT"
// const DELETE_COMMENT ="comments/DELETE_COMMENT"
// const CREATE_REPLY_COMMENT = "comments/CREATE_REPLY_COMMENT";
// const EDIT_REPLY_COMMENT = "comments/EDIT_REPLY_COMMENT";
// const DELETE_REPLY_COMMENT = "comments/DELETE_REPLY_COMMENT";

// //action creator
// const getComments = (comments) => ({
//     type: GET_COMMENTS,
//     comments
// })

// const createComment = (comment) => ({
//     type: CREATE_COMMENT,
//     comment
// })

// const editComment = (comment) => ({
//     type: EDIT_COMMENT,
//     comment
// })

// const deleteComment = (commentId) => ({
//     type: DELETE_COMMENT,
//     commentId
// })

// const createReplyComment = (comment) => ({
//   type: CREATE_REPLY_COMMENT,
//   comment,
// });

// const editReplyComment = (comment) => ({
//   type: EDIT_REPLY_COMMENT,
//   comment,
// });

// const deleteReplyComment = (comment) => ({
//   type: DELETE_REPLY_COMMENT,
//   comment,
// });

// //Thunk Action Creators
// export const fetchComments = (commentId) => async (dispatch) => {
//     const response = await fetch(`/api/comments/`);

//     if (response.ok) {
//       const { comments } = await response.json();
//       dispatch(getComments(comments));
//     }
//   };

// export const createCommentThunk = (comment, postId) => async (dispatch) => {
//     const response = await fetch(`/api/comments/new`,{
//         method:'POST',
//         headers:{ "Content-Type" : 'application/json' },
//         body: JSON.stringify( comment, postId )
//     })

//     if(response.ok) {
//         const newComment = await response.json();
//         await dispatch(createComment(newComment))
//         return newComment;
//     }
// };

// export const editCommentThunk = (comment, postId) => async (dispatch) => {
//   const response = await fetch(`/api/comments/${comment.id}`,{
//       method:'PUT',
//       headers:{ "Content-Type" : 'application/json' },
//       body: JSON.stringify(comment)
//   })
//   if(response.ok) {
//       const editedComment = await response.json();
//       dispatch(editComment(editedComment))
//       return editedComment;
//   };
// }

// export const deleteCommentThunk = (commentId) => async (dispatch) => {
//     const response = await fetch(`/api/comments/${commentId}`,{
//         method:'DELETE'
//     })

//     if(response.ok) {
//       const comment = await response.json();
//       dispatch(deleteComment(commentId))
//     }
//   }

//   export const createReplyCommentThunk =
//   (comment, commentId) => async (dispatch) => {

//     const response = await fetch(`/api/comments/${commentId}/replyComments`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(comment),
//     });

//     if (response.ok) {
//       const newComment = await response.json();
//       await dispatch(createReplyComment(newComment));
//       return newComment;
//     }
//   };

// export const editReplyCommentThunk =
//   (comment, commentId) => async (dispatch) => {
//     const response = await fetch(
//       `/api/comments/${commentId}/replyComments/${comment.id}`,
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(comment),
//       }
//     );
//     if (response.ok) {
//       const editedComment = await response.json();
//       dispatch(editReplyComment(editedComment.commentReply));
//       return editedComment.commentReply;
//     }
//   };

// export const deleteReplyCommentThunk =
//   (commentId, replyCommentId) => async (dispatch) => {
//     const response = await fetch(
//       `/api/comments/${commentId}/replyComments/${replyCommentId}`,
//       {
//         method: "DELETE",
//       }
//     );

//     if (response.ok) {
//       const comment = await response.json();
//       dispatch(deleteReplyComment(commentId, comment));
//     }
//   };


// const initialState = {}

// const commentReducer = (state = initialState, action) => {
//     let newState = {};
//     let postId;
//     let post;
//     let newPost;
//     let index;
//     switch (action.type) {
//       case GET_COMMENTS:
//         action.comments.forEach((comment) => {
//           newState[comment.id] = comment;
//         });
//         return newState;
//         case CREATE_COMMENT:
//           newState = { ...state };
//           postId = action.comment.comment.postId;
//           post = state[postId];
//           newPost = { ...post };
//           newState[postId] = newPost;
//           newPost.commentReply = [...post.commentReply, action.comment.comment];
//           return newState;
//         case EDIT_COMMENT:
//           newState = { ...state };
//           postId = action.comment.postId;
//           console.log(action);
//           post = state[postId];
//           newPost = { ...post };
//           newState[postId] = newPost;
//           console.log(newPost);
//           index = post.comments.findIndex(
//             (comment) => comment.id === action.comment.id
//           );
//           newPost.comments = [...post.comments];
//           newPost.comments[index] = action.comment;
//           return newState;
//         case DELETE_COMMENT:
//           newState = { ...state };
//           postId = action.comment;
//           post = state[postId];
//           newPost = { ...post };
//           newState[postId] = newPost;
//           index = post.comments.findIndex(
//             (comment) => comment.id === action.comment.id
//           );
//           newPost.comments = [...post.comments];
//           newPost.comments.splice(index, 1);
//           return newState;
//       //case CREATE_REPLY_COMMENT:
//     //     newState = { ...state };
//     //     console.log("action", action);
//     //     commentId = action.comment.commentReply.commentId;
//     //     post = newState[commentId];
//     //     newPost = { ...post };
//     //     console.log("hello", newPost);
//     //     newPost.comments.commentReply = newPost.comments.commentReply || [];
//     //     console.log("hello", newPost.comments.commentReply);
//     //     newPost.comments.commentReply = [...newPost.comments.commentReply, action.comment];
//     //     console.log("hello3", newPost.comments.commentReply);

//     //     newPost.comments[0].commentReply = [
//     //       ...newPost.comments,
//     //       action.comment.commentReply,
//     //     ];

//     //     newState[commentId] = newPost;
//     //     return newState;
//     // case EDIT_REPLY_COMMENT:
//     //   newState = { ...state };
//     //   commentId = action.comment.commentId;
//     //   post = newState[commentId];
//     //   newPost = { ...post };
//     //   // console.log("post",newPost)
//     //   newState[commentId] = newPost;
//     //   // console.log(newPost);
//     //   index = newPost.comments.findIndex((reply) => reply.id === action.comment.id);
//     //   newPost.comments = [...post.comments];
//     //   newPost.comments[index] = action.comment;
//     //   return newState;
//     // case DELETE_REPLY_COMMENT:
//     //   newState = { ...state };
//     //   postId = action.comment;
//     //   post = state[postId];
//     //   newPost = { ...post };
//     //   newState[postId] = newPost;
//     //   index = post.comments.findIndex(
//     //     (reply) => reply.id === action.comment.id
//     //   );
//     //   newPost.comments = [...post.comments];
//     //   newPost.comments.splice(index, 1);
//     //   return newState;
//       default:
//         return state;
//     }
//   };

// export default commentReducer
