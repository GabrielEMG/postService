import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

type QuestionType = {
  title: string;
  index: number;
  type: string;
  answers?: any;
};

type Props = {
  question: QuestionType;
};

const BooleanChoice: React.FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const handleClick = (objKey: string, id: number): void => {
    dispatch({
      type: "UPDATE_SINGLE_QUESTION_ANSWER",
      payload: { questionId: id, answer: objKey },
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

        {Object.keys(props.question.answers).map(
          (objKey: string, id: number): JSX.Element => (
            <Row
              className="py-2 px-4 align-items-center border-bottom border-dark"
              key={id}
              onClick={() => handleClick(objKey, props.question.index)}
            >
              <input
                className="form-check-input my-0"
                type="checkbox"
                onChange={() => {}}
                checked={props.question.answers[objKey]}
              />
              <h6 className="my-0">{objKey}</h6>
            </Row>
          )
        )}
      </Col>
    </Container>
  );
};

export default BooleanChoice;
