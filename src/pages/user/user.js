import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SurveySelector from "./charts/surveySelector";
import CreateSurvey from "./createSurvey";
import UserSidebar from "./userSidebar";
import EditSurvey from "./editSurvey/editSurvey";
import Loader from "react-loader-spinner";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const User = () => {
  const [section, setSection] = useState("data");
  const user = useSelector((selector) => selector.user);
  const history = useHistory();
  const wdim = useWindowDimensions();
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
    <div
      className="app-colors"
      style={{
        display: "inline-flex",
        width: "100%",
      }}
    >
      <div style={{ width: 150 }}>
        <UserSidebar section={section} setSection={setSection} />
      </div>
      <div
        style={{
          width: wdim.width - 150,
        }}
      >
        {user.isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader type="TailSpin" color="#3C1874" width="100" height="100" />
          </div>
        ) : (
          user.email !== null && displaySection(section)
        )}
      </div>
    </div>
  );
};

export default User;
