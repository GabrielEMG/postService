import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayQuestion from "./displayQuestion";
import FullScreenMessage from "../../../components/fullScreenMessage";
import useSurveyData from "../../../hooks/useSurveyData";
import Loader from "react-loader-spinner";
import ButtonWithLoad from "../../../components/buttonWithLoad";

const Survey = () => {
  const survey = useSelector((selector) => selector.survey);

  const [surveyState, sendSurvey] = useSurveyData();

  return (
    <Container
      style={{
        backgroundColor: "f3f3f3",
        minHeight: "100vh",
        color: "#3C1874",
        display: "flex",
        position: "relative",
      }}
    >
      {survey.questions.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Loader type="TailSpin" color="#3C1874" width="100" height="100" />
        </div>
      ) : (
        <Col>
          {surveyState.responded ? (
            <FullScreenMessage message="Gracias por responder la encuesta" />
          ) : (
            <Col>
              <Row className="justify-content-center p-4">
                <h2>{survey.title}</h2>
              </Row>
              {survey.questions.map((question, index) => (
                <div
                  key={index}
                  style={{
                    boxShadow: "2px 4px 8px 1px rgba(0,0,0,0.2)",
                    borderRadius: 10,
                    padding: 20,
                    marginBottom: 20,
                  }}
                >
                  <DisplayQuestion
                    type={question.type}
                    question={question}
                    index={index}
                  />
                </div>
              ))}

              <ButtonWithLoad
                condition={surveyState.isSending}
                action={sendSurvey}
              />
            </Col>
          )}
        </Col>
      )}
    </Container>
  );
};