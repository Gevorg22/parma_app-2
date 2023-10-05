import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotFound from "./NotFound";

describe("Проверка компонента NotFound", () => {
  it("Проверка на наличие компонента NotFound", () => {
    render(<NotFound />);

    expect(screen.getByTestId("not-found")).toBeInTheDocument();
  });

  it("Проверка на наличие иконки", () => {
    render(<NotFound />);
    expect(screen.getByTestId("not-found-icon")).toBeInTheDocument();
  });

  it("Проверка на наличие заголовка 'Страница не найдена'", () => {
    render(<NotFound />);

    expect(screen.getByText("Страница не найдена")).toBeInTheDocument();
  });
});
