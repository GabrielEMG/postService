import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, InputGroup, FormControl, Row } from "react-bootstrap";

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
      <Row className="p-2">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Título de pregunta</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Título"
            name="title"
            onChange={(e) => handleTitleChange(e)}
          />
        </InputGroup>
      </Row>
    </Container>
  );
};

export default GradeChoice;
