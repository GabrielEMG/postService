import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import localizeError from "./localizeError";
import { Row, Button, Col } from "react-bootstrap";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import LoginInputGroup from "./loginInputGroup";

const Login = () => {
  const user = useSelector((selector) => selector.user);
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
    error: null,
  });
  const wd = useWindowDimensions();

  useEffect(() => {
    if (user.isLogin && !user.isLoading) {
      history.push("/user");
    }
  }, [user.isLogin, user.isLoading, history]);

  const handleSignin = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      await auth.signInWithEmailAndPassword(state.email, state.password);
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message, isLoading: false }));
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F3F3F3",
        position: "absolute",
        width: "100%",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: -1,
      }}
    >
      <Col
        style={{
          backgroundColor: "#F3F3F3",
          position: "relative",
          width: wd.width > 1024 ? "40%" : wd.width > 600 ? "66%" : "85%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: "2px 4px 8px 1px rgba(0,0,0,0.2)",
          borderRadius: 10,
          paddingTop: 30,
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 20,
        }}
      >
        <Row
          className="justify-content-center align-items-center"
          style={{ color: "#3C1874", textAlign: "center" }}
        >
          <h2>Iniciar sesion con tu cuenta</h2>
        </Row>

        <LoginInputGroup
          icon={faEnvelope}
          placeholder="Correo electronico"
          type="email"
          onChange={setState}
          name="email"
        />

        <LoginInputGroup
          icon={faLock}
          placeholder="Contraseña"
          type="password"
          onChange={setState}
          name="password"
          activateFromKeyboard={true}
          action={handleSignin}
        />

        <Row className="justify-content-center mt-4 mx-2">
          {state.isLoading ? (
            <Loader type="TailSpin" color="#3C1874" width="100" height="50" />
          ) : (
            <div style={{ width: "100%" }}>
              <Button
                style={{
                  borderRadius: 10,
                  width: "100%",
                  height: 50,
                  backgroundColor: "#3C1874",
                  borderColor: "rgba(0,0,0,0)",
                }}
                size="lg"
                onClick={() => {
                  handleSignin();
                }}
              >
                Iniciar sesion
              </Button>
            </div>
          )}
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Link style={{ marginTop: 20 }} to="/register">
            No tienes una cuenta? crea una aquí
          </Link>
          <Link style={{ marginTop: 10 }} to="/recuperar_contraseña">
            Olvidaste tu contraseña? recupérala aquí
          </Link>
        </div>
        <Row
          style={{
            display: "inline-flex",
            marginTop: 10,
            marginRight: "10%",
            marginLeft: "10%",
            width: "80%",
            height: 60,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "#932432",
              width: "100%",
            }}
          >
            {localizeError(state.error)}
          </p>
        </Row>
      </Col>
    </div>
  );
};

export default Login;
