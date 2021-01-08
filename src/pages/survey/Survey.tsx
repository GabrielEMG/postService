import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayQuestion from "./DisplayQuestion";
import FullScreenMessage from "../../components/fullScreenMessage";
import useSurveyData from "../../hooks/useSurveyData";
import Loader from "react-loader-spinner";
import ButtonWithLoad from "../../components/buttonWithLoad";

type QuestionType = {
  title: string;
  index: number;
  type: string;
  answers?: any;
};

type SurveyType = {
  title: string;
  owner: string;
  date: Date;
  questions: QuestionType[];
};

const Survey = () => {
  const survey = useSelector((selector: any): SurveyType => selector.survey);
  const [surveyState, sendSurvey] = useSurveyData();
  const [ind, setInd] = React.useState<number>(0);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (survey.questions.length > 0 && !surveyState.isLoading) {
      let question: QuestionType = survey.questions[ind];

      if (question.type === "grade-choice") {
        setIsDisabled(false);
      }

      if (question.type === "textfield-input") {
        //Enable "new button" if there is some text
        setIsDisabled((): boolean => (question.answers ? false : true));
      }
      if (
        question.type === "single-choice" ||
        question.type === "multi-choice" ||
        question.type === "boolean-choice"
      ) {
        //Enable "next button" if an answer is provided
        setIsDisabled(() =>
          Object.values(question.answers).some((v): boolean => v === true)
            ? false
            : true
        );
      }
    }
  }, [ind, survey]);

  return (
    <Container
      fluid={true}
      style={{ backgroundColor: "#f3f3f3", color: "#3C1874" }}
    >
      <Row style={{ minHeight: "100vh" }}>
        {surveyState.isLoading ? (
          <div
            style={{
              width: "100%",
              minHeight: "100vh -webkit-fill-available",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Loader type="TailSpin" color="#3C1874" width="100" height="100" />
          </div>
        ) : surveyState.responded ? (
          <FullScreenMessage message="Gracias por responder la encuesta" />
        ) : surveyState.error === "ERROR 404" ? (
          <FullScreenMessage message="El enlace no esta anexado a ninguna encuesta" />
        ) : (
          <Col>
            <Row
              style={{ height: "10vh" }}
              className="justify-content-center align-items-center"
            >
              <h3>{survey.title}</h3>
            </Row>
            <Row className="justify-content-center pb-2">{`${ind + 1}/${
              survey.questions.length
            }`}</Row>
            <Row
              style={{
                height: "70vh",
                position: "relative",
                marginLeft: "5%",
                marginRight: "5%",
                width: "90%",
                overflowX: "hidden",
                boxShadow: "2px 4px 8px 1px rgba(0,0,0,0.2)",
                borderRadius: 10,
              }}
            >
              {survey.questions.map(
                (question: QuestionType, index: number): JSX.Element => (
                  <div
                    key={index}
                    style={{
                      padding: 20,
                      height: "100%",
                      width: "100%",
                      top: 0,
                      left: `${100 * index}%`,
                      position: "absolute",
                      transform: `translateX(${-ind * 100}%)`,
                      transition: "all 200ms ease-out",
                    }}
                  >
                    <DisplayQuestion question={question} />
                  </div>
                )
              )}
            </Row>
            <Row
              style={{
                height: "10vh",
                alignItems: "center",
                marginLeft: "10%",
                marginRight: "10%",
                width: "80%",
              }}
            >
              <Col>
                {ind > 0 && (
                  <Button
                    size="sm"
                    style={{
                      width: "100%",
                      backgroundColor: "#3C1874",
                      borderColor: "rgba(0,0,0,0)",
                      height: 50,
                      borderRadius: 10,
                    }}
                    disabled={surveyState.isSending}
                    onClick={() =>
                      setInd((prev: number): number => {
                        if (prev === 0) return 0;
                        else return prev - 1;
                      })
                    }
                  >
                    Atras
                  </Button>
                )}
              </Col>
              <Col>
                {ind !== survey.questions.length - 1 ? (
                  <Button
                    disabled={isDisabled}
                    size="sm"
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      height: 50,
                      backgroundColor: "#3C1874",
                      borderColor: "rgba(0,0,0,0)",
                    }}
                    onClick={() =>
                      setInd((prev) => {
                        if (prev === survey.questions.length - 1)
                          return survey.questions.length - 1;
                        else return prev + 1;
                      })
                    }
                  >
                    Siguiente
                  </Button>
                ) : (
                  <ButtonWithLoad
                    condition={surveyState.isSending}
                    action={sendSurvey}
                    label="Enviar encuesta"
                    isDisabled={isDisabled}
                  />
                )}
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Survey;
