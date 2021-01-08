import React from "react";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import localizeError from "./localizeError";
import { Row, Button, Col } from "react-bootstrap";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomInputGroup from "../../components/customInputGroup";

type UserLogin = {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
};

const Login: React.FC = (): JSX.Element => {
  const isLogin = useSelector(
    (selector: any): boolean => selector.user.isLogin
  );
  const history = useHistory();
  const [state, setState] = React.useState<UserLogin>({
    email: "",
    password: "",
    isLoading: false,
    error: null,
  });
  const wd: { width: number; height: number } = useWindowDimensions();

  React.useEffect(() => {
    if (isLogin) {
      history.push("/user");
    }
  }, [isLogin, history]);

  const handleSignin: Function = async (): Promise<any> => {
    try {
      setState(
        (prev: UserLogin): UserLogin => ({
          ...prev,
          isLoading: true,
          error: null,
        })
      );
      await auth.signInWithEmailAndPassword(state.email, state.password);
    } catch (err) {
      setState(
        (prev: UserLogin): UserLogin => ({
          ...prev,
          error: err.message,
          isLoading: false,
        })
      );
    }
  };

  return (
    <div
      className="app-colors"
      style={{
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

        <CustomInputGroup
          icon={faEnvelope}
          placeholder="Correo electronico"
          type="email"
          onChange={setState}
          name="email"
        />

        <CustomInputGroup
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
