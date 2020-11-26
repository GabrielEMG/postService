import React from "react";
import { Container, Row } from "react-bootstrap";

const InputTextDisplay = (props) => {
  const answers = props.data.map(
    (doc) => doc.questions.find((q) => q.title === props.question.title).answers
  );

  const answersDisplay = answers.map((ans, ind) => <Row key={ind}>{ans}</Row>);

  return <Container>{JSON.stringify(answersDisplay)}</Container>;
};

export default InputTextDisplay;
