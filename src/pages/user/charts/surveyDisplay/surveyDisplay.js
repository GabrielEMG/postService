import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import QuestionChart from "./questionChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const SurveyDisplay = (props) => {
  const survey = useSelector((selector) => selector.user.surveys)[props.ind];
  let data = useSelector((selector) => selector.user.surveyData)[props.ind];
  const [filterDate, setFilterDate] = useState({
    initial: new Date(new Date().setDate(new Date().getDate() - 30)),
    ending: new Date(),
  });

  data = data.filter(
    (doc) =>
      doc.date.seconds * 1000 >= filterDate.initial &&
      doc.date.seconds * 1000 <= filterDate.ending
  );

  return (
    <Container>
      <Row>
        <p>Fecha inicial</p>
        <DatePicker
          locale="es"
          dateFormat="dd/MM/yyyy"
          selected={filterDate.initial}
          onChange={(date) =>
            setFilterDate((prev) => {
              return { ...prev, initial: date };
            })
          }
        />
        <p>Fecha término</p>
        <DatePicker
          locale="es"
          dateFormat="dd/MM/yyyy"
          selected={filterDate.ending}
          onChange={(date) =>
            setFilterDate((prev) => {
              return { ...prev, ending: date };
            })
          }
        />
      </Row>
      <Row
        style={{
          backgroundColor: "green",
          marginTop: 10,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        <h1>{survey.title}</h1>
      </Row>
      <Row className="bg-light">
        <Col>
          {survey.questions.map((question, index) => (
            <QuestionChart
              key={index}
              question={question}
              data={data}
              date={filterDate}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SurveyDisplay;
