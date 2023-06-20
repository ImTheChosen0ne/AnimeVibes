const GET_USER = "session/GET_USER";

const getUsers = (users) => ({
  type: GET_USER,
  users,
});

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch("/api/users");

  if (res.ok) {
    const { users } = await res.json();
    dispatch(getUsers(users));
  }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case GET_USER:
        action.users.forEach((user) => {
          newState[user.id] = user;
        });
        return newState;
      default:
        return state;
    }
  };

export default usersReducer;
