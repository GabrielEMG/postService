import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SurveySelector from "./charts/surveySelector";
import CreateSurvey from "./createSurvey";
import UserSidebar from "./userSidebar";
import EditSurvey from "./editSurvey/editSurvey";
import Loader from "react-loader-spinner";

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
    if (!user.isLoading && !user.isLogin) {
      history.push("/login");
    }
  }, [user.isLoading, user.isLogin, history]);

  return (
    <Container fluid style={{ backgroundColor: "#F3F3F3" }}>
      <Row>
        <UserSidebar section={section} setSection={setSection} />
        <Col>
          {user.isLoading ? (
            <div
              style={{
                position: "relative",
                display: "flex",
                width: "100%",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader
                type="TailSpin"
                color="#3C1874"
                width="100"
                height="100"
                style={{ transform: "translate(-50%,-50%)" }}
              />
            </div>
          ) : (
            user.email !== null && displaySection(section)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default User;
