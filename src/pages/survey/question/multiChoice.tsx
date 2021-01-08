import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

type QuestionType = {
  title: string;
  index: number;
  type: string;
  answers?: any;
};

type Props = {
  question: QuestionType;
};

const MultiChoice: React.FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const handleClick = (objKey: string, ind: number): void => {
    dispatch({
      type: "UPDATE_MULTI_QUESTION_ANSWER",
      payload: { answer: objKey, questionId: ind },
    });
  };
  return (
    <Container>
      <Col>
        <Row className="mb-4">
          <h4>{props.question.title}</h4>
        </Row>

        {Object.keys(props.question.answers).map(
          (objKey: any, id: number): JSX.Element => (
            <Row
              className="py-3 mx-2  border-bottom border-dark"
              key={id}
              onClick={(): void => handleClick(objKey, props.question.index)}
            >
              <input
                className="form-check-input my-0"
                onChange={() => {}}
                checked={props.question.answers[objKey]}
                type="checkbox"
              />
              <h6 className="my-0">{objKey}</h6>
            </Row>
          )
        )}
      </Col>
    </Container>
  );
};

export default MultiChoice;
