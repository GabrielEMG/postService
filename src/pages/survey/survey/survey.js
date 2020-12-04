import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayQuestion from "./displayQuestion";
import LoadingFullScreen from "../../../components/loadings/loadingFullScreen";
import FullScreenMessage from "../../../components/fullScreenMessage";
import useSurveyData from "../../../hooks/useSurveyData";

const Survey = () => {
  const survey = useSelector((selector) => selector.survey);

  const [surveyState, sendSurvey] = useSurveyData();

  return (
    <Container>
      {surveyState.loadingData ? (
        <LoadingFullScreen />
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
                <DisplayQuestion
                  type={question.type}
                  question={question}
                  index={index}
                  key={index}
                />
              ))}
              <Button className="w-100 my-4" onClick={() => sendSurvey()}>
                Enviar ecuesta
              </Button>
            </Col>
          )}
        </Col>
      )}
    </Container>
  );
};

export default Survey;
