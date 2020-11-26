import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import SingleChoice from "../question/singleChoice";
import MultiChoice from "../question/multiChoice";
import GradeChoice from "../question/gradeChoice";
import TextInputQuestion from "../question/textInputQuestion";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";

const Survey = () => {
  const dispatch = useDispatch();
  const survey = useSelector((selector) => selector.survey);
  const { id, key } = useParams();
  const [loadingKeyCheck, setLoadingKeyCheck] = useState(true);
  const [keyInfo, setKeyInfo] = useState({
    client: "",
    responded: false,
    survey: "",
    loading: true,
  });

  useEffect(() => {
    const getKeyInfo = async () => {
      await db
        .collection("survey-keys")
        .doc(key)
        .get()
        .then((doc) => {
          setKeyInfo(doc.data());
          setLoadingKeyCheck(false);
        });
    };
    getKeyInfo();
  }, [id, key]);

  useEffect(() => {
    const getSurvey = async () => {
      if (keyInfo.survey === id) {
        db.collection("survey")
          .doc(id)
          .get()
          .then((doc) => {
            dispatch({ type: "SET_SURVEY_STATE", payload: doc.data() });
            setKeyInfo((prev) => {
              return { ...prev, loading: false };
            });
          })
          .catch((err) => console.log(err.message));
      } else {
        console.log("key error");
      }
    };
    getSurvey();
  }, [loadingKeyCheck]);

  const sendSurvey = async () => {
    await db
      .collection("survey-responses")
      .doc()
      .set(survey)
      .then(() => {
        alert("encuesta enviada satisfactoriamente");
        setKeyInfo((prev) => {
          return { ...prev, responded: true };
        });
      })
      .catch((err) => console.log(err.message));
    await db
      .collection("survey-keys")
      .doc(key)
      .update({ responded: true })
      .catch((err) => console.log(err.message));
  };
  return (
    <Container>
      {keyInfo.loading ? (
        <Row
          style={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader type="Circles" color="#00BFFF" height={150} width={150} />
        </Row>
      ) : (
        <Col>
          {keyInfo.responded ? (
            <Row
              style={{
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>Gracias por responder la encuesta</h1>
            </Row>
          ) : (
            <div>
              <Row className="justify-content-center p-4">
                <h2>{survey.title}</h2>
              </Row>
              {survey.questions.map((question, index) => {
                if (question.type === "single-choice")
                  return (
                    <SingleChoice
                      question={question}
                      index={index}
                      key={index}
                    />
                  );
                else if (question.type === "multi-choice")
                  return (
                    <MultiChoice
                      question={question}
                      index={index}
                      key={index}
                    />
                  );
                else if (question.type === "grade-choice")
                  return (
                    <GradeChoice
                      question={question}
                      index={index}
                      key={index}
                    />
                  );
                else if (question.type === "text-input")
                  return (
                    <TextInputQuestion
                      question={question}
                      index={index}
                      key={index}
                    />
                  );
                else return <p>nada</p>;
              })}

              <Button
                style={{ width: "100%", marginTop: 40, marginBottom: 40 }}
                de
                onClick={() => sendSurvey()}
              >
                Enviar ecuesta
              </Button>
            </div>
          )}
        </Col>
      )}
    </Container>
  );
};

export default Survey;
