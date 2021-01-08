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

const SingleChoice: React.FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const handleClick = (objKey: string, ind: number) => {
    dispatch({
      type: "UPDATE_SINGLE_QUESTION_ANSWER",
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
          (objKey: string, id: number): JSX.Element => (
            <Row
              className="py-3 px-4 align-items-center border-bottom border-dark"
              key={id}
              onClick={(): void => handleClick(objKey, props.question.index)}
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

export default SingleChoice;
