import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserList from "./UserList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../redux/userReducer";
import { PersonType } from "../UserForm/UserForm";
import { MemoryRouter } from "react-router-dom";

const mockInitialState = {
  users: [
    {
      id: 1,
      firstName: "Тест",
      lastName: "Тестов",
      email: "test@test.com",
      gender: "Мужской",
      birthDate: "1990-01-01",
      personType: PersonType.LegalPerson,
      message: "Тестовое поле ввода!",
    },
  ],
};

const mockStore = configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState: mockInitialState,
});

describe("Проверка компонента UserList", () => {
  it("Проверка на отображение сообщения, когда пользователи отсутствуют", () => {
    const mockStore = configureStore({
      reducer: {
        users: userReducer,
      },
    });

    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>,
    );

    expect(screen.getByText("Пользователи отсутствуют")).toBeInTheDocument();
  });

  it("Проверка на отображение пользователей, когда они присутствуют", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Тест Тестов")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });

  it("Проверка на наличие ссылки на страницу редактирования пользователя, на наличие иконки", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      </Provider>,
    );

    const editLink = screen.getByRole("link", { name: /edit-button/i });
    expect(editLink).toBeInTheDocument();
    expect(editLink.getAttribute("href")).toBe("/edit/1");
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("Проверка на наличие кнопки удаления пользователя, на наличие иконки", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("remove-button")).toBeInTheDocument();
    expect(screen.getByTestId("remove-icon")).toBeInTheDocument();
  });
});
