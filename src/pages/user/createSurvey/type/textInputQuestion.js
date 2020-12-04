import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import InputText from "../../../../components/inputText";

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

  const handleTitleChange = (e) => {
    setQuestion((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  return (
    <Container className="mt-2">
      <InputText
        label="Título de pregunta"
        placeholder="Introduce el título de la pregunta acá"
        name="title"
        setState={handleTitleChange}
      />
    </Container>
  );
};

export default TextInputQuestion;
