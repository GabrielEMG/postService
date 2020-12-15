import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SurveySelector from "./charts/surveySelector";
import CreateSurvey from "./createSurvey";
import UserSidebar from "./userSidebar";
import EditSurvey from "./editSurvey/editSurvey";

const User = () => {
  const [section, setSection] = useState("data");
  const user = useSelector((selector) => selector.user);
  const history = useHistory();
  const displaySection = (section) => {
    switch (section) {
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
      <Row>
        <UserSidebar section={section} setSection={setSection} />
        <Col
          style={{ height: "100vh", padding: 0, margin: 0 }}
          className="overflow-auto"
        >
          {user.loading ? (
            <h1>cargando...</h1>
          ) : (
            user.email !== null && displaySection(section)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default User;
