const GET_POSTS = "posts/GET_POSTS"

//action creator
const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})


//Thunk Action Creators
export const fetchPosts = () => async (dispatch) => {
    const res = await fetch("/api/posts");

    if (res.ok) {
      const { posts } = await res.json();
        dispatch(getPosts(posts));
    }
  };


const initialState = {}

const postsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_POSTS:
            action.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState
        default:
            return state;
    }
}

export default postsReducer
