import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SurveySelector from "./charts/surveySelector";
import CreateSurvey from "./createSurvey";

const styles = {
  menuButton: {
    width: "100%",
    marginBottom: "10px",
    marginRight: 5,
    marginLeft: 5,
  },
  menuContainer: {},
};

const UserLandingPage = () => {
  const [section, setSection] = useState("data");
  const user = useSelector((selector) => selector.user);
  const showSection = (e) => {
    setSection(e.target.name);
  };
  const history = useHistory();
  if (user.email === null) history.push("/login");
  const dispatch = useDispatch();
  const displaySection = (type) => {
    switch (type) {
      case "data":
        return <SurveySelector />;
      case "createSurvey":
        return <CreateSurvey />;
      case "editSurvey":
      case "adminAccout":
        break;
      default:
        return <h1>none</h1>;
    }
  };

  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col
          md={2}
          style={{
            borderWidth: 10,
            backgroundColor: "rgba(0,150,255,0.5)",
          }}
        >
          <Row onClick={() => history.push("/")}>LogoEmpresa</Row>

          <Row
            style={{
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {user.email}
          </Row>
          <Row>
            <Button
              name="data"
              onClick={(e) => showSection(e)}
              style={{
                ...styles.menuButton,
                backgroundColor: section === "data" ? "red" : "blue",
              }}
            >
              Revisar encuestas
            </Button>
          </Row>
          <Row>
            <Button
              name="createSurvey"
              onClick={(e) => showSection(e)}
              style={{
                ...styles.menuButton,
                backgroundColor: section === "createSurvey" ? "red" : "blue",
              }}
            >
              Crear encuesta
            </Button>
          </Row>
          <Row>
            <Button
              name="editSurvey"
              onClick={(e) => showSection(e)}
              style={{
                ...styles.menuButton,
                backgroundColor: section === "editSurvey" ? "red" : "blue",
              }}
            >
              Editar encuesta
            </Button>
          </Row>
          <Row>
            <Button
              name="adminAccount"
              onClick={(e) => showSection(e)}
              style={{
                ...styles.menuButton,
                backgroundColor: section === "adminAccount" ? "red" : "blue",
              }}
            >
              Administrar cuenta
            </Button>
          </Row>
          <Row>
            <Button
              onClick={(e) => {
                dispatch({ type: "LOGOUT_USER" });
                history.push("/");
              }}
              style={{
                ...styles.menuButton,
                backgroundColor: "blue",
              }}
            >
              Salir de cuenta
            </Button>
          </Row>
        </Col>
        <Col
          style={{ height: "100%", padding: 0, margin: 0 }}
          md={10}
          className="overflow-auto"
        >
          {user.email !== null && displaySection(section)}
        </Col>
      </Row>
    </Container>
  );
};

export default UserLandingPage;
