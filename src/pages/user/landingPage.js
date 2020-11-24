import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SurveySelector from "./charts/surveySelector";
import CreateSurvey from "./createSurvey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faPlusSquare,
  faEdit,
  faSignOutAlt,
  faUserEdit,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import "./landingPage.css";

const UserLandingPage = () => {
  const [section, setSection] = useState("data");
  const user = useSelector((selector) => selector.user);

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
        <Col lg={2} style={{ backgroundColor: "rgba(150,150,150,0.2)" }}>
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
          <Row
            onClick={(e) => setSection("data")}
            className={`sidebar-button ${section === "data" && "selected"}`}
          >
            <FontAwesomeIcon icon={faChartBar} />
            <h6 className="text-container">Encuestas</h6>
            <FontAwesomeIcon icon={faCaretRight} />
          </Row>
          <Row
            onClick={(e) => setSection("createSurvey")}
            className={`sidebar-button ${
              section === "createSurvey" && "selected"
            }`}
          >
            <FontAwesomeIcon icon={faPlusSquare} />
            <h6 className="text-container">Crear encuesta</h6>
            <FontAwesomeIcon icon={faCaretRight} />
          </Row>
          <Row
            onClick={(e) => setSection("editSurvey")}
            className={`sidebar-button ${
              section === "editSurvey" && "selected"
            }`}
          >
            <FontAwesomeIcon icon={faEdit} />
            <h6 className="text-container">Editar encuestas</h6>
            <FontAwesomeIcon icon={faCaretRight} />
          </Row>
          <Row
            onClick={(e) => setSection("adminAccount")}
            className={`sidebar-button ${
              section === "adminAccount" && "selected"
            }`}
          >
            <FontAwesomeIcon icon={faUserEdit} />
            <h6 className="text-container">Cuenta</h6>
            <FontAwesomeIcon icon={faCaretRight} />
          </Row>
          <Row
            onClick={(e) => {
              dispatch({ type: "LOGOUT_USER" });
              history.push("/");
            }}
            className="sidebar-button"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <h6 className="text-container">Salir</h6>
            <FontAwesomeIcon icon={faCaretRight} />
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
