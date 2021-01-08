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

const GradeChoice: React.FC<Props> = (props): JSX.Element => {
  const [inputValue, setInputValue] = React.useState<number>(6);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val: number = JSON.parse(e.target.value);
    setInputValue(val);
  };

  React.useEffect(() => {
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
      <Col style={{ backgroundColor: "green", height: "100%" }}>
        <Row className="mb-4">
          <h4>{props.question.title}</h4>
        </Row>
        <Row className="my-4" style={{ height: "50%" }}>
          <input
            style={{
              width: "100%",
            }}
            type="range"
            min={1}
            max={10}
            defaultValue={6}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange(e)
            }
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
