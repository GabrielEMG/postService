import React, { useEffect, useState } from "react";
import { Container, Row, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SingleChoice = (props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(2);
  const [question, setQuestion] = useState({
    title: "",
    answers: [],
    type: "single-choice",
    index: props.count,
  });
  console.log(question.answers);
  useEffect(() => {
    setQuestion((prev) => {
      let newAns = prev.answers;
      while (newAns.length > inputs) {
        newAns.pop();
      }
      while (newAns.length < inputs) {
        newAns.push("");
      }
      return { ...prev, answers: newAns };
    });
  }, [inputs]);

  const handleTitleChange = (e) => {
    setQuestion((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const handleAnswerChange = (e) => {
    setQuestion((prev) => {
      let newArr = prev.answers;
      newArr[e.target.name] = e.target.value;
      return { ...prev, answers: newArr };
    });
  };

  useEffect(() => {
    dispatch({
      type: "SINGLE_CHOICE_QUESTION",
      payload: question,
    });
  }, [question]);

  return (
    <Container className="mt-2">
      <Row className="p-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Título de pregunta</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Introduce el título de la pregunta acá"
            name="title"
            onChange={(e) => handleTitleChange(e)}
          />
        </InputGroup>
      </Row>
      <Row className="p-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Cantidad de respuestas</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="select"
            custom
            onChange={(e) => setInputs(JSON.parse(e.target.value))}
            name="inputs-q"
          >
            {new Array(5).fill().map((e, i) => (
              <option key={i} value={i + 2}>
                {i + 2} respuestas
              </option>
            ))}
          </FormControl>
        </InputGroup>
      </Row>
      <Row>
        {new Array(inputs).fill().map((e, i) => (
          <InputGroup className="p-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Respuesta n@{i + 1}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              name={i}
              key={i}
              onChange={(e) => handleAnswerChange(e)}
              placeholder="Introduce la respuesta acá"
            />
          </InputGroup>
        ))}
      </Row>
    </Container>
  );
};

export default SingleChoice;
