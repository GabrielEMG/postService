import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SingleChoice = (props) => {
  const dispatch = useDispatch();
  const handleClick = (index, key) => {
    dispatch({
      type: "UPDATE_SINGLE_QUESTION_ANSWER",
      payload: { questionId: index, answer: key },
    });
  };
  return (
    <Container>
      <Col>
        <Row className="mb-4">
          <h4>{props.question.title}</h4>
        </Row>

        {Object.keys(props.question.answers).map((key, id) => (
          <Row
            className="py-3 px-4 align-items-center border-bottom border-dark"
            key={id}
            onClick={() => handleClick(props.question.index, key)}
          >
            <input
              className="form-check-input my-0"
              type="checkbox"
              onChange={() => {}}
              checked={props.question.answers[key]}
            />
            <h6 className="my-0">{key}</h6>
          </Row>
        ))}
      </Col>
    </Container>
  );
};

export default SingleChoice;
