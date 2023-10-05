import React from "react";
import { ReactComponent as NotFoundIcon } from "../../icons/Not-found.svg";
import "./NotFound.scss";

const NotFound: React.FC = () => {
  return (
    <div className="not-found" data-testid="not-found">
      <NotFoundIcon data-testid="not-found-icon" />
      <h1 className="not-found__title">Страница не найдена</h1>
    </div>
  );
};

export default NotFound;
