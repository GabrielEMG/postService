import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { db, auth } from "../../firebase";
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

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((selector) => selector.user);
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(" ");

  useEffect(() => {
    if (user.email !== null && !user.loading) history.push("/user");
    else console.log("necesita logear");
  }, [user]);

  const handleChange = (e) => {
    setSigninInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignIn = async () => {
    try {
      dispatch({ type: "START_LOADING" });
      await auth.signInWithEmailAndPassword(
        signinInfo.email,
        signinInfo.password
      );
    } catch (err) {
      setError(localizeError(err.message));
      dispatch({ type: "END_LOADING" });
    }
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
            {user.loading ? (
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
                    handleSignIn();
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
            <p style={{ marginLeft: 25, marginRight: 25 }}>{error}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
