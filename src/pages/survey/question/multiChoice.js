import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

const MultiChoice = (props) => {
  const dispatch = useDispatch();
  const handleClick = (index, key) => {
    dispatch({
      type: "UPDATE_MULTI_QUESTION_ANSWER",
      payload: { questionId: index, answer: key },
    });
  };
  return (
    <Container
      className="border rounded px-3 pb-3 mt-3"
      style={{ backgroundColor: "rgba(150,150,150,0.2)" }}
    >
      <Col>
        <Row className="justify-content-center">
          <h4>{props.question.title}</h4>
        </Row>

        {Object.keys(props.question.answers).map((key, id) => (
          <Row
            className="py-2 mx-2  border-bottom border-dark"
            key={id}
            onClick={() => handleClick(props.question.index, key)}
          >
            <input
              class="form-check-input my-0"
              onChange={() => {}}
              checked={props.question.answers[key]}
              type="checkbox"
            />
            <h6 className="my-0">{key}</h6>
          </Row>
        ))}
      </Col>
    </Container>
  );
};

export default MultiChoice;
