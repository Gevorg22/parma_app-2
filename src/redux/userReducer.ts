import { ADD_USER, DELETE_USER, EDIT_USER, User, UserActionTypes } from "./types";

const initialState: User[] = [];

const userReducer = (state = initialState, action: UserActionTypes): User[] => {
  switch (action.type) {
    case ADD_USER:
      const userWithId = {
        ...action.payload,
        id: state.length ? state[state.length - 1].id + 1 : 1,
      };
      return [...state, userWithId];

    case EDIT_USER:
      return state.map((user) => (user.id === action.payload.id ? action.payload : user));

    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};

export default userReducer;
