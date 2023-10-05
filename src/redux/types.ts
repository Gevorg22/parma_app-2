import { AnyAction } from "redux";

export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export type UserActionTypes = AnyAction;

type PersonType = "Физ. лицо" | "Юр. лицо";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
  personType: PersonType;
  message: string;
}

export interface RootStore {
  users: User[];
}
