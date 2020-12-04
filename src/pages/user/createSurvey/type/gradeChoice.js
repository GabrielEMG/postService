import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import InputText from "../../../../components/inputText";

const GradeChoice = (props) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({
    title: "",
    type: "grade-choice",
    index: props.count,
  });

  const handleTitleChange = (e) => {
    setQuestion((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  useEffect(() => {
    dispatch({
      type: "GRADE_CHOICE_QUESTION",
      payload: question,
    });
  }, [question, dispatch]);

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

export default GradeChoice;
