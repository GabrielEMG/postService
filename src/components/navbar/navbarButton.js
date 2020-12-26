import { useHistory, useLocation } from "react-router-dom";
import "./navbarButton.css";

const NavbarButton = (props) => {
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
