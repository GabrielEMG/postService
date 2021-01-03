import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

const GradeChoice = (props) => {
  const [inputValue, setInputValue] = useState(6);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_GRADE_QUESTION_ANSWER",
      payload: {
        questionId: props.question.index,
        answer: inputValue,
      },
    });
  }, [inputValue, dispatch, props.question.index]);

  return (
    <Container style={{ height: "100%" }}>
      <Col>
        <Row className="mb-4">
          <h4>{props.question.title}</h4>
        </Row>
        <Row className="my-4" style={{ height: "45vh" }}>
          <input
            style={{
              width: "100%",
            }}
            type="range"
            min={1}
            max={10}
            defaultValue={6}
            onChange={(e) => handleChange(e)}
          />
        </Row>
        <Row className="justify-content-center mt-4">
          <h1>{inputValue}</h1>
        </Row>
      </Col>
    </Container>
  );
};

export default GradeChoice;
