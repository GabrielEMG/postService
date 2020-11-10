import React, { useState } from "react";
import SingleChoice from "./question/singleChoice";
import MultipleChoice from "./question/multiChoice";
import GradeChoice from "./question/gradeChoice";
import TextInputQuestion from "./question/textInputQuestion";

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
      default:
        return true;
    }
  };

  return (
    <div>
      <select onChange={(e) => handleChange(e)} name="type" id="">
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
    </div>
  );
};

export default CreateQuestion;
