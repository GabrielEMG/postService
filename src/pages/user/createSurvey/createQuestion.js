import React, { useState } from "react";
import SingleChoice from "./type/singleChoice";
import MultipleChoice from "./type/multiChoice";
import GradeChoice from "./type/gradeChoice";
import TextInputQuestion from "./type/textInputQuestion";
import BooleanChoice from "./type/booleanChoice";
import { Container, InputGroup, Row, FormControl } from "react-bootstrap";

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
      case "textfield-input":
        return <TextInputQuestion count={props.count} />;
      case "boolean-choice":
        return <BooleanChoice count={props.count} />;
      default:
        return true;
    }
  };

  return (
    <Container
      style={{ backgroundColor: "rgba(150,150,150,0.2)" }}
      className="border rounded p-4 m-3"
    >
      <Row className="justify-content-center">
        <h6>Pregunta numero {props.count + 1}</h6>
      </Row>
      <InputGroup className="p-2">
        <InputGroup.Prepend>
          <InputGroup.Text>Tipo de pregunta</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="select"
          custom
          onChange={(e) => handleChange(e)}
          name="type"
          id=""
        >
          <option value="" hidden>
            Selecciona el tipo de pregunta
          </option>
          <option value="single-choice">selección simple</option>
          <option value="multiple-choice">selección multiple</option>
          <option value="grade-choice">nota de 1 a 10</option>
          <option value="boolean-choice">si o no</option>
          <option value="textfield-input">respuesta con texto</option>
        </FormControl>
      </InputGroup>

      <Container>{display()}</Container>
    </Container>
  );
};

export default CreateQuestion;
