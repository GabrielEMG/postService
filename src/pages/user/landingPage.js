import React, { useState, useEffect } from "react";
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
import EditSurvey from "./editSurvey/editSurvey";
import useLogout from "../../hooks/useLogout";
import NavigationButton from "../../components/navigationButton";
import CompanyLogo from "../../components/companyLogo";

const UserLandingPage = () => {
  const [section, setSection] = useState("data");
  const user = useSelector((selector) => selector.user);
  const logoutUser = useLogout();
  const history = useHistory();
  const displaySection = (type) => {
    switch (type) {
      case "data":
        return <SurveySelector />;
      case "createSurvey":
        return <CreateSurvey />;
      case "editSurvey":
        return <EditSurvey />;
      case "adminAccout":
        break;
      default:
        return <h1>none</h1>;
    }
  };

  useEffect(() => {
    if (user.email === null && !user.loading) {
      history.push("/login");
    }
  }, [user.loading, user.email]);

  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col lg={2} style={{ backgroundColor: "rgba(150,150,150,0.2)" }}>
          <CompanyLogo width={100} height={100} />

          <NavigationButton
            setState={setSection}
            icon={faChartBar}
            title="Encuestas"
            globalSection={section}
            section="data"
          />
          <NavigationButton
            setState={setSection}
            icon={faPlusSquare}
            title="Crear encuesta"
            globalSection={section}
            section="createSurvey"
          />
          <NavigationButton
            setState={setSection}
            icon={faEdit}
            title="Editar encuestas"
            globalSection={section}
            section="editSurvey"
          />
          <NavigationButton
            setState={setSection}
            icon={faUserEdit}
            title="Cuenta"
            globalSection={section}
            section="adminAccount"
          />

          <Row onClick={(e) => logoutUser()}>
            <Col>
              <NavigationButton
                setState={setSection}
                icon={faSignOutAlt}
                title="Salir"
                globalSection={section}
                section="Logout"
              />
            </Col>
          </Row>
        </Col>
        {user.loading ? (
          <h1>cargando...</h1>
        ) : (
          <Col
            style={{ height: "100%", padding: 0, margin: 0 }}
            md={10}
            className="overflow-auto"
          >
            {user.email !== null && displaySection(section)}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserLandingPage;
