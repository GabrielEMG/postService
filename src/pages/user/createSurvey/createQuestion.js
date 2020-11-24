import React, { useState } from "react";
import SingleChoice from "./type/singleChoice";
import MultipleChoice from "./type/multiChoice";
import GradeChoice from "./type/gradeChoice";
import TextInputQuestion from "./type/textInputQuestion";
import BooleanChoice from "./type/booleanChoice";
import { Container } from "react-bootstrap";

const CreateQuestion = (props) => {
  const [questionType, setQuestionType] = useState("");

  const handleChange = (e) => {
    setQuestionType(e.target.value);
  };
  const display = () => {
    switch (questionType) {
      case "single-choice":
        return <SingleChoice count={props.count} />;
      case "multiple-choice":
        return <MultipleChoice count={props.count} />;
      case "grade-choice":
        return <GradeChoice count={props.count} />;
      case "textfield-answer":
        return <TextInputQuestion count={props.count} />;
      case "boolean-choice":
        return <BooleanChoice count={props.count} />;
      default:
        return true;
    }
  };

  return (
    <Container className="border p-4 m-3">
      <select
        className="form-control"
        onChange={(e) => handleChange(e)}
        name="type"
        id=""
      >
        <option hidden value="">
          Selecciona una opción
        </option>
        <option value="single-choice">selección simple</option>
        <option value="multiple-choice">selección multiple</option>
        <option value="grade-choice">nota de 1 a 10</option>
        <option value="boolean-choice">si o no</option>
        <option value="textfield-answer">respuesta con texto</option>
      </select>
      <div>{display()}</div>
    </Container>
  );
};

export default CreateQuestion;
