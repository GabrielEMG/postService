import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {
  Col,
  Container,
  InputGroup,
  Row,
  FormControl,
  Button,
} from "react-bootstrap";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handlePasswordRecovery = async () => {
    try {
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
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
          <Row className="justify-content-center">
            <h3>Recupera tu contraseña</h3>
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
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                style={{
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              />
            </InputGroup>
          </Row>
          <Row className="justify-content-center my-4 mx-2">
            <Button
              style={{ width: "100%", borderRadius: 10 }}
              onClick={() => {
                setIsLoading(true);
                handlePasswordRecovery();
              }}
            >
              Recuperar contraseña
            </Button>
            <Link to="/login">
              o puedes entrar con tu correo y contraseña acá
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoverPassword;
