import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

const GradeChoice = (props) => {
  const [inputValue, setInputValue] = useState(5);
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
  }, [inputValue]);

  return (
    <Container
      className="border rounded px-3 pb-3 mt-3"
      style={{ backgroundColor: "rgba(150,150,150,0.2)" }}
    >
      <Col>
        <Row className="justify-content-center">
          <h4>{props.question.title}</h4>
        </Row>
        <Row>
          <Col xs={11}>
            <input
              style={{ width: "100%" }}
              type="range"
              min={1}
              max={10}
              defaultValue={5}
              onChange={(e) => handleChange(e)}
            />
          </Col>
          <Col xs={1}>
            <h6>{inputValue}</h6>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default GradeChoice;
