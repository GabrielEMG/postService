import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./navbarButton.css";

type Props = {
  link: string;
  label: string;
};

const NavbarButton: React.FC<Props> = (props): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  return (
    <div
      className={`navbar-button ${
        location.pathname === props.link && "is-selected"
      }`}
      onClick={() => history.push(props.link)}
    >
      {props.label}
    </div>
  );
};

export default NavbarButton;
