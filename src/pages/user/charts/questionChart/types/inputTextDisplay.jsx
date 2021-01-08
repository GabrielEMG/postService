import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const InputTextDisplay = (props) => {
  const sortedAns = props.data
    ? props.data.sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];
  const answers = sortedAns.map((doc) => {
    const d = doc.questions.find((q) => q.title === props.question.title);
    if (d) return d.answers;
    else return [];
  });

  return (
    <Container className="p-4">
      <Row className="justify-content-center">
        <h3>{props.question.title}</h3>
      </Row>
      <Row
        style={{
          boxShadow: "1px -1px 4px 1px rgba(0,0,0,0.4) inset",
          margin: 10,
          padding: 10,
          top: 0,
          left: 0,
          height: 300,
          overflowY: "scroll",
        }}
      >
        <Col>
          {answers.map((ans, i) => (
            <Row style={{ marginBottom: 10 }} key={i}>
              • {ans}
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default InputTextDisplay;
