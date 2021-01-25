import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CustomInputGroup from "../../components/customInputGroup";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { auth, firebase } from "../../firebase";
import localizeError from "./localizeError";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import PaperBG from "../../components/paperBG";

type NewUser = {
  email: string;
  password: string;
  passwordVerification: string;
  isLoading: boolean;
  error: string;
};

const Register: React.FC = (): JSX.Element => {
  const history = useHistory();
  const isLogin: boolean = useSelector(
    (selector: any): boolean => selector.user.isLogin
  );
  const wd = useWindowDimensions();
  const [state, setState] = React.useState<NewUser>({
    email: "",
    password: "",
    passwordVerification: "",
    isLoading: false,
    error: "",
  });

  React.useEffect(() => {
    if (isLogin) {
      history.push("/user");
    }
  }, [isLogin, history]);

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
      setState((prev: NewUser): NewUser => ({ ...prev, isLoading: true }));
      const doc: any = await auth.createUserWithEmailAndPassword(
        state.email,
        state.password
      );
      if (doc !== null)
        await firebase.database().ref(`user/${doc.user.uid}`).set({
          email: state.email,
          uid: doc.user.uid,
          surveyCap: 0,
          isAdmin: false,
        });
    } catch (err) {
      setState(
        (prev: NewUser): NewUser => ({
          ...prev,
          isLoading: false,
          error: err.message,
        })
      );
    }
  };

  return (
    <Container>
      <Row className="justify-content-center" style={{ paddingTop: 20 }}>
        <Col xs={12} sm={11} md={11} lg={7} xl={6}>
          <PaperBG>
            <Col>
              <Row
                className="justify-content-center align-items-center"
                style={{ color: "#3C1874", textAlign: "center" }}
              >
                <h2>Crear una cuenta</h2>
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
              />
              <CustomInputGroup
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
                  <Loader
                    type="TailSpin"
                    color="#3C1874"
                    width="100"
                    height="50"
                  />
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
          </PaperBG>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
