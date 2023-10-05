import { ADD_USER, DELETE_USER, EDIT_USER, User } from "./types";

type ActionType<T, P> = {
  type: T;
  payload: P;
};

export const addUser = (user: User): ActionType<typeof ADD_USER, User> => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const editUser = (user: User): ActionType<typeof EDIT_USER, User> => {
  return {
    type: EDIT_USER,
    payload: user,
  };
};

export const deleteUser = (id: number): ActionType<typeof DELETE_USER, number> => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};
