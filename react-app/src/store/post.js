const GET_POSTS = "posts/GET_POSTS"
const CREATE_POST = "posts/CREATE_POST"
const EDIT_POST = "posts/EDIT_POST"
const DELETE_POST = "posts/DELETE_POST"

//action creator
const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

const createPost = (newPost) => ({
    type: CREATE_POST,
    newPost
})

const editPost = (editPost) => ({
    type: EDIT_POST,
    editPost
})

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

//Thunk Action Creators
export const fetchPosts = () => async (dispatch) => {
    const res = await fetch("/api/posts");

    if (res.ok) {
      const { posts } = await res.json();
        dispatch(getPosts(posts));
    }
  };

  export const createPostThunk = (post) => async (dispatch) => {
    const response = await fetch('/api/posts/new',{
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(post)
    })

    let newPost
    if(response.ok) {
        newPost = await response.json();
        await dispatch(createPost(newPost))
    }

    return newPost;
};

export const editPostThunk = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${post.id}`,{
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(post)
    })

    if(response.ok) {
        const editedPost = await response.json();
        dispatch(editPost(editedPost))
        return editedPost;
    };
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`,{
        method:'DELETE'
    })
    if(response.ok) {
      dispatch(deletePost(postId))
      return
    }
  }

const initialState = {}

const postsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_POSTS:
            action.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState
        case CREATE_POST:
            newState = { ...state}
            newState[action.newPost.id] = action.newPost
            return newState
        case EDIT_POST:
            newState = { ...state}
            newState[action.editPost.id] = action.editPost
            return newState
        case DELETE_POST:
            newState = { ...state}
            delete newState[action.postId]
            return newState
        default:
            return state;
    }
}

export default postsReducer
