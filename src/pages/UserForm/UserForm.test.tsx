import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserForm, { PersonType } from "./UserForm";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../redux/userReducer";

const mockInitialState = {
  users: [],
};

const mockStore = configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState: mockInitialState,
});

describe("Проверка компонента UserForm", () => {
  it("Проверка при вводе короткого количества символов поля firstName", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const firstNameInput = screen.getByPlaceholderText("Введите имя...");
    fireEvent.change(firstNameInput, { target: { value: "A" } });
    const submitButton = screen.getByText("Добавить");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Должны быть только буквы, цифры и минимум 2 символа")).toBeInTheDocument();
    });
  });

  it("Проверка при вводе короткого количества символов поля lastName", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const lastNameInput = screen.getByPlaceholderText("Введите фамилию...");
    fireEvent.change(lastNameInput, { target: { value: "A" } });
    const submitButton = screen.getByText("Добавить");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Должны быть только буквы, цифры и минимум 2 символа")).toBeInTheDocument();
    });
  });

  it("Проверка при совпадении полей firstName и lastName", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const firstNameInput = screen.getByPlaceholderText("Введите имя...");
    const lastNameInput = screen.getByPlaceholderText("Введите фамилию...");
    fireEvent.change(firstNameInput, { target: { value: "Тест" } });
    fireEvent.change(lastNameInput, { target: { value: "Тест" } });
    const submitButton = screen.getByText("Добавить");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Имя и фамилия не могут совпадать")).toBeInTheDocument();
    });
  });

  it("Проверка при неверном формате email", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText("Введите эл.адрес почты...");
    fireEvent.change(emailInput, { target: { value: "test.com" } });
    const submitButton = screen.getByText("Добавить");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Неверный формат email")).toBeInTheDocument();
    });
  });

  it("Проверка, если пользователю меньше 18 лет", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const birthdayInput = screen.getByLabelText("Дата рождения:");

    fireEvent.change(birthdayInput, { target: { value: `2015-01-01` } });
    const submitButton = screen.getByText("Добавить");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Пользователь должен быть старше 18 лет")).toBeInTheDocument();
    });
  });

  it("Проверка на корректность выбора типа в select", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const personTypeSelect = screen.getByLabelText("Выберите тип:") as HTMLSelectElement;
    fireEvent.change(personTypeSelect, { target: { value: PersonType.LegalPerson } });
    expect(personTypeSelect.value).toBe(PersonType.LegalPerson);
  });

  it("Проверка кнопки на атрибут disabled", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <UserForm />
        </Router>
      </Provider>,
    );

    const submitButton = screen.getByText("Добавить");
    expect(submitButton).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText("Введите имя..."), { target: { value: `Тест` } });
    expect(submitButton).not.toBeDisabled();
  });
});
