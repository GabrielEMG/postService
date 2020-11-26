import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, InputGroup, FormControl } from "react-bootstrap";

const TextInputQuestion = (props) => {
  const [question, setQuestion] = useState({
    title: "",
    type: "text-input",
    index: props.index,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "TEXT_INPUT_QUESTION",
      payload: question,
    });
  }, [question.title]);
  console.log(question);
  return (
    <Container className="mt-2">
      <Row className="p-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Título de pregunta</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Título"
            name="title"
            onChange={(e) =>
              setQuestion((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
        </InputGroup>
      </Row>
    </Container>
  );
};

export default TextInputQuestion;
