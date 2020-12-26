import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import InputText from "../../../../components/inputText";
import SelectForm from "../../../../components/selectForm";

const SingleChoice = (props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(2);
  const [question, setQuestion] = useState({
    title: "",
    answers: [],
    type: "single-choice",
    index: props.count,
  });

  useEffect(() => {
    setQuestion((prev) => {
      let newAns = prev.answers;
      while (newAns.length > inputs) newAns.pop();
      while (newAns.length < inputs) newAns.push("");
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
  }, [question, dispatch]);

  return (
    <Container className="mt-2">
      <InputText
        label="Título de pregunta"
        placeholder="Introduce el título de la pregunta acá"
        name="title"
        setState={handleTitleChange}
      />
      <SelectForm label="Cantidad de respuestas" setState={setInputs}>
        {new Array(5).fill().map((e, i) => (
          <option key={i} value={i + 2}>
            {i + 2} respuestas
          </option>
        ))}
      </SelectForm>

      {new Array(inputs).fill().map((e, i) => (
        <InputText
          key={i}
          label={`respuesta ${i + 1}`}
          placeholder="Introduce la respuesta acá"
          name={i}
          setState={handleAnswerChange}
        />
      ))}
    </Container>
  );
};

export default SingleChoice;
