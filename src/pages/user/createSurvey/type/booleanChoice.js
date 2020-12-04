import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SelectForm from "../../../../components/selectForm";

const BooleanChoice = (props) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({
    title: "",
    type: "boolean-choice",
    index: props.count,
    answers: ["Si", "No"],
  });

  const handleTitleChange = (e) => {
    setQuestion((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  useEffect(() => {
    dispatch({
      type: "BOOLEAN_CHOICE_QUESTION",
      payload: question,
    });
  }, [question]);

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

export default BooleanChoice;
