import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";
import localizeError from "./localizeError";
import {
  Container,
  FormControl,
  InputGroup,
  Row,
  Button,
  Col,
} from "react-bootstrap";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [loginState, handleSignIn] = useLogin();
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSigninInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ marginTop: 100, marginBottom: 100 }}
      >
        <Col
          xs={11}
          sm={11}
          md={10}
          lg={6}
          xl={4}
          className="border border-dark"
          style={{
            paddingTop: 40,
            paddingBottom: 40,
            borderRadius: 20,
            backgroundColor: "rgba(0,200,0,0.6)",
          }}
        >
          <Row className="justify-content-center align-items-center">
            <h3>Ingresa con tu cuenta</h3>
          </Row>
          <Row className="justify-content-center my-4 mx-2">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ width: 50, justifyContent: "center" }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Correo electrónico"
                type="text"
                onChange={(e) => handleChange(e)}
                name="email"
                style={{
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              />
            </InputGroup>
          </Row>
          <Row className="justify-content-center my-4 mx-2">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ width: 50, justifyContent: "center" }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Contraseña"
                type="password"
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => {
                  if (e.code === "Enter") {
                    handleSignIn();
                  }
                }}
                name="password"
                style={{
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              />
            </InputGroup>
          </Row>
          <Row
            className="justify-content-center my-4 mx-2"
            style={{ height: 50 }}
          >
            {loginState.isLoading ? (
              <Loader
                type="ThreeDots"
                color="#2BAD60"
                width="100"
                height="50"
              />
            ) : (
              <div style={{ width: "100%" }}>
                <Button
                  style={{ borderRadius: 10, width: "100%" }}
                  size="lg"
                  onClick={() => {
                    handleSignIn(signinInfo.email, signinInfo.password);
                  }}
                >
                  Ingresar
                </Button>
                <Link to="/recuperar_contraseña">
                  Olvidaste tu contraseña? recupérala aquí
                </Link>
              </div>
            )}
          </Row>
          <Row
            className="justify-content-center align-items-center"
            style={{ color: "red", height: "60px" }}
          >
            <p style={{ marginLeft: 25, marginRight: 25 }}>
              {loginState.error}
            </p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
