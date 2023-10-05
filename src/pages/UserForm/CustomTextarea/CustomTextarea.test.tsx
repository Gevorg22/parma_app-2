import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Formik, Form, FormikErrors } from "formik";
import CustomTextarea from "./CustomTextarea";

interface FormValues {
  message: string;
}

describe("Проверка компонента CustomTextarea", () => {
  const initialValues: FormValues = {
    message: "",
  };

  it("Проверка при вводе короткого количества символов", async () => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={jest.fn()}
        validate={(values) => {
          const errors: FormikErrors<FormValues> = {};
          if (values.message.length < 10) {
            errors.message = "Сообщение должно содержать минимум 10 символов";
          }
          return errors;
        }}>
        <Form>
          <CustomTextarea name="message" placeholder="Введите сообщение..." />
          <button type="submit">Добавить</button>
        </Form>
      </Formik>,
    );

    const textareaInput = screen.getByPlaceholderText("Введите сообщение...");
    fireEvent.change(textareaInput, { target: { value: "тест" } });
    const submitButton = screen.getByText("Добавить");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Сообщение должно содержать минимум 10 символов")).toBeInTheDocument();
    });
  });

  it("Проверка отображения ошибки при касании поля", async () => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={jest.fn()}
        validateOnBlur
        validate={(values) => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.message) {
            errors.message = "Обязательное поле";
          }
          return errors;
        }}>
        <Form>
          <CustomTextarea name="message" placeholder="Введите сообщение..." />
          <button type="submit">Добавить</button>
        </Form>
      </Formik>,
    );

    const textareaInput = screen.getByPlaceholderText("Введите сообщение...");
    textareaInput.focus();
    textareaInput.blur();

    await waitFor(() => {
      expect(screen.getByText("Обязательное поле")).toBeInTheDocument();
    });
  });

  it("Проверка отображения label", () => {
    render(
      <Formik initialValues={{ message: "" }} onSubmit={jest.fn()}>
        <Form>
          <CustomTextarea name="message" label="Сообщение" />
        </Form>
      </Formik>,
    );

    expect(screen.getByText("Сообщение:")).toBeInTheDocument();
  });

  it("Проверка отображения placeholder", () => {
    render(
      <Formik initialValues={{ message: "" }} onSubmit={jest.fn()}>
        <Form>
          <CustomTextarea name="message" placeholder="Введите сообщение..." />
        </Form>
      </Formik>,
    );

    expect(screen.getByPlaceholderText("Введите сообщение...")).toBeInTheDocument();
  });
});
