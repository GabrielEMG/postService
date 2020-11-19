import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

const MyNavbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((selector) => selector.user);
  const location = useLocation();


  return (
    location.pathname !== "/user" ? 
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        LogoEmpresa
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features"></Nav.Link>
          <Nav.Link href="#pricing">Acerca de nosotros</Nav.Link>
          <Nav.Link href="#">Precios</Nav.Link>
        </Nav>
        <Nav>
          {user.email === null ? (
            <Nav.Link
              onClick={() => {
                history.push({
                  pathname: "/login",
                  state: { prev: "login" },
                });
              }}
            >
              Ingresar como usuario
            </Nav.Link>
          ) : (
            <Nav.Link
              onClick={() => {
                history.push("/user");
              }}
            >
              Ir a usuario
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>: null
  );
};

export default MyNavbar;
