import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Проверка компонента Header", () => {
  it("Проверка на наличие компонента Header", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("Проверка на наличие ссылки на страницу с пользователями, на наличие иконки", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: /list-link/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute("href")).toBe("/");

    expect(screen.getByTestId("list-icon")).toBeInTheDocument();
  });

  it("Проверка на наличие ссылки на страницу добавления пользователя, на наличие иконки", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const addLink = screen.getByRole("link", { name: /add-link/i });
    expect(addLink).toBeInTheDocument();
    expect(addLink.getAttribute("href")).toBe("/add");

    expect(screen.getByTestId("add-icon")).toBeInTheDocument();
  });
});
