import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../icons/Add.svg";
import { ReactComponent as HomeIcon } from "../../icons/Home.svg";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header" data-testid="header">
      <div className="header__container">
        <Link to="/" className="header__nav-link" aria-label="list-link">
          <HomeIcon data-testid="list-icon" />
        </Link>
        <Link to="/add" className="header__nav-link" aria-label="add-link">
          <AddIcon data-testid="add-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
