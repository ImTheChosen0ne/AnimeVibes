// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_FAVORITE = "session/ADD_FAVORITE"
const DELETE_FAVORITE = "session/DELETE_FAVORITE"
const ADD_LIKE = "session/ADD_LIKE"
const DELETE_LIKE = "session/DELETE_LIKE"
const ADD_FOLLOWER = "session/ADD_FOLLOWER"
const REMOVE_FOLLOWER = "session/REMOVE_FOLLOWER"
const EDIT_PROFILE = "session/EDIT_PROFILE";
const CREATE_CHAT = "users/CREATE_CHAT"
const DELETE_CHAT = "users/DELETE_CHAT"


const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const addFavorite = (user) => ({
	type: ADD_FAVORITE,
	user
})

const deleteFavorite = (user) => ({
	type: DELETE_FAVORITE,
	user
})

const addLike = (user) => ({
	type: ADD_LIKE,
	user
})

const deleteLike = (user) => ({
	type: DELETE_LIKE,
	user
})

const addFollower = (follower) => ({
	type: ADD_FOLLOWER,
	follower
});

const removeFollower = (follower) => ({
	type: REMOVE_FOLLOWER,
	follower
});

const editProfile = (user) => ({
	type: EDIT_PROFILE,
	user,
});

const createChat = (newChat, userId) => ({
	type: CREATE_CHAT,
	newChat,
	userId
});

const deleteChat = (chatId, userId) => ({
	type: DELETE_CHAT,
	chatId,
	userId
});


const initialState = { user: null, followers: [], };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const addFavoriteThunk = (postId, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/favorites/posts/${postId}`,{
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
    })
    if(response.ok) {
        const user = await response.json();
        dispatch(addFavorite(user))
        return user;
    };
}

export const deleteFavoriteThunk = (postId, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/favorites/posts/${postId}`,{
        method:'DELETE',
	})
	if(response.ok) {
        const user = await response.json();
        dispatch(deleteFavorite(user))
        return user;
    };
}

export const addLikeThunk = (postId, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/likes/posts/${postId}`,{
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
    })
    if(response.ok) {
        const user = await response.json();
        dispatch(addLike(user))
        return user;
    };
}

export const deleteLikeThunk = (postId, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/likes/posts/${postId}`,{
        method:'DELETE',
	})
	if(response.ok) {
        const user = await response.json();
        dispatch(deleteLike(user))
        return user;
    };
}

export const addFollowerThunk = (userId, followerId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/followers/${followerId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const user = await response.json();
		dispatch(addFollower(user));
		return user;
	}
};

export const removeFollowerThunk = (userId, followerId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/followers/${followerId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const user = await response.json();
		dispatch(removeFollower(user));
		return user;
	}
};

export const editProfileThunk = (user) => async (dispatch) => {
	const response = await fetch(`/api/users/${user.id}`, {
	  method: "PUT",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(user),
	});

	if (response.ok) {
	  const editedProfile = await response.json();
	  dispatch(editProfile(editedProfile));
	  return editedProfile;
	}
  };


  export const createChatThunk = (chat, userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/chats`, {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(chat),
	});

	if (response.ok) {
	  const newChat = await response.json();
	  await dispatch(createChat(newChat, userId));
	  return newChat;
	}
  };

  export const deleteChatThunk = (userId, chatId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/chats/${chatId}`, {
	  method: "DELETE",
	});
	if (response.ok) {
	  dispatch(deleteChat(chatId));
	  return;
	}
  };


export default function reducer(state = initialState, action) {
	let newState = {};

	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case ADD_FAVORITE:
			return { ...action.user}
		case DELETE_FAVORITE:
			return { ...action.user}
		case ADD_LIKE:
			return { ...action.user}
		case DELETE_LIKE:
			return { ...action.user}
		case ADD_FOLLOWER:
			newState = { ...state, user: { ...state.user, followers: [...state.user.followers, action.follower.user]}};
			return newState;
		case REMOVE_FOLLOWER:
			const updatedFollowers = state.user.followers.filter(
				  (follower) => follower.id !== action.follower.user.id);
			return { ...state, user: { ...state.user, followers: updatedFollowers}};
		case EDIT_PROFILE:
			return { ...action.user };
		case CREATE_CHAT:
			const updatedUser = { ...state.user };
			if (action.newChat.chat) {
				updatedUser.chats.push(action.newChat.chat);
			} else {
				updatedUser.chats.push(action.newChat);
			}
			return {
				...state,
				user: updatedUser,
			};
		case DELETE_CHAT:
			const updatedUserdel = { ...state.user };
			updatedUserdel.chats = updatedUserdel.chats.filter(
			  (chat) => chat.id !== action.chatId
			);
			return {
			  ...state,
			  user: updatedUserdel,
			};
		default:
			return state;
	}
}
