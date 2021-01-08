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

const TextInputQuestion: React.FC<Props> = (props): JSX.Element => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_TEXTINPUT_QUESTION_ANSWER",
      payload: {
        questionId: props.question.index,
        answer: e.target.value,
      },
    });
  };

  return (
    <Container style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col>
          <Row>
            <h4>{props.question.title}</h4>
          </Row>
          <Row style={{ height: "90%" }}>
            <textarea
              style={{
                width: "100%",
                resize: "none",
                height: "80%",
                borderRadius: 10,
                padding: 5,
                borderColor: "rgba(0,0,0,0.2)",
              }}
              placeholder="Escribe una respuesta"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                handleChange(e)
              }
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TextInputQuestion;
