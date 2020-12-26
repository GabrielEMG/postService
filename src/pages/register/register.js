import { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import RegisterInputGroup from "./registerInputGroup";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { auth, firebase } from "../../firebase";
import localizeError from "./localizeError";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

const Register = () => {
  const history = useHistory();
  const user = useSelector((selector) => selector.user);
  const wd = useWindowDimensions();
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordVerification: "",
    name: "",
    isLoading: false,
    error: "",
  });

  useEffect(() => {
    if (user.isLogin && !user.isLoading) {
      history.push("/user");
    }
  }, [user.isLogin, user.isLoading, history]);

  const handleSignin = () => {
    if (state.password !== state.passwordVerification) {
      setState((prev) => ({
        ...prev,
        error: "La contraseña y la verificacion de contraseña no son iguales",
      }));
    } else {
      createUser();
    }
  };

  const createUser = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const doc = await auth.createUserWithEmailAndPassword(
        state.email,
        state.password
      );
      await firebase.database().ref(`user/${doc.user.uid}`).set({
        email: state.email,
        uid: doc.user.uid,
        surveyCap: 0,
      });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err.message }));
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
          <h2>Crear una cuenta</h2>
        </Row>

        <RegisterInputGroup
          icon={faEnvelope}
          placeholder="Correo electronico"
          type="email"
          onChange={setState}
          name="email"
        />
        <RegisterInputGroup
          icon={faLock}
          placeholder="Contraseña"
          type="password"
          onChange={setState}
          name="password"
        />
        <RegisterInputGroup
          icon={faLock}
          placeholder="Verificar Contraseña"
          type="password"
          onChange={setState}
          name="passwordVerification"
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
                Crear cuenta
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
          <Link style={{ marginTop: 20 }} to="/login">
            Ya posees una cuenta? ingresa aqui
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

export default Register;
