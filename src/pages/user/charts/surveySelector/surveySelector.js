import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import SurveyDisplay from "../surveyDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import "./surveySelector.css";

const SurveySelector = () => {
  const [surveySelected, setSurveySelected] = useState(0);
  const user = useSelector((selector) => selector.user);

  return (
    <Container>
      <Row className="justify-content-center">
        {user.surveys.length > 1 &&
          user.surveys.map((e, i) => (
            <Col
              key={i}
              className={`selector-button ${
                surveySelected === i && "selected-survey"
              }`}
              onClick={() => setSurveySelected(i)}
            >
              <Row
                className="justify-content-center"
                style={{ height: "40px", alignItems: "center" }}
              >
                <FontAwesomeIcon icon={faChartPie} />
                <h6
                  style={{
                    margin: 0,
                    marginLeft: 5,
                  }}
                >
                  {e.title}
                </h6>
              </Row>
            </Col>
          ))}

        {user.surveys.length === 0 ? (
          <h1>no tienes encuestas creadas</h1>
        ) : (
          <Container>
            <SurveyDisplay ind={surveySelected} />
          </Container>
        )}
      </Row>
    </Container>
  );
};

export default SurveySelector;
