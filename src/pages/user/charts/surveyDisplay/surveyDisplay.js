import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import QuestionChart from "./questionChart";

import DateSelector from "../dateSelector";

const SurveyDisplay = (props) => {
  const user = useSelector((selector) => selector.user);
  const survey = user.surveys[props.ind];
  const surveyData = user.surveyData[props.ind].data;
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState({
    initial: new Date(new Date().setDate(new Date().getDate() - 7)),
    ending: new Date(),
  });

  useEffect(() => {
    if (!user.isDataLoading) {
      setFilterDate((prev) => ({ ...prev, ending: new Date() }));
    }
  }, [user.surveyData, user.isDataLoading]);

  useEffect(() => {
    if (!user.isDataLoading) {
      surveyData &&
        setData(() =>
          surveyData.filter(
            (doc) =>
              doc.date &&
              new Date(doc.date) >= filterDate.initial &&
              new Date(doc.date) <= filterDate.ending
          )
        );
    }
  }, [surveyData, user.isDataLoading, filterDate]);
  return (
    <Container>
      {survey.questions && (
        <>
          <Row className="p-4 my-2 border">
            <Col>
              <Row className="justify-content-center">
                <h1>Título: {survey.title}</h1>
              </Row>
            </Col>
            <Col className="justify-content-center">
              <Row className="justify-content-center">
                <h1>Votos: {data ? data.length : 0}</h1>
              </Row>
            </Col>
          </Row>

          <DateSelector date={filterDate} onChange={setFilterDate} />

          <Row className="bg-light">
            <Col>
              {survey.questions.map((question, index) => (
                <QuestionChart
                  key={index}
                  question={question}
                  data={data ? data : []}
                  date={filterDate}
                />
              ))}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SurveyDisplay;
