import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MultiChoice = (props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(2);
  const [question, setQuestion] = useState({
    title: "",
    answers: [],
    type: "multi-choice",
    index: props.count,
  });

  useEffect(() => {
    setQuestion((prev) => {
      let newAns = prev.answers;
      while (newAns > inputs) newAns.pop();
      while (newAns < inputs) newAns.push("");
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
      type: "MULTI_CHOICE_QUESTION",
      payload: question,
    });
  }, [question]);

  return (
    <div>
      <input
        type="text"
        placeholder="Título"
        name="title"
        onChange={(e) => handleTitleChange(e)}
      />
      <select
        name="inputs-q"
        onChange={(e) => setInputs(JSON.parse(e.target.value))}
      >
        <option hidden value="">
          Selecciona la cantidad de repuestas
        </option>
        {new Array(5).fill().map((e, i) => (
          <option key={i} value={i + 2}>
            {i + 2} respuestas
          </option>
        ))}
      </select>
      {new Array(inputs).fill().map((e, i) => (
        <input
          type="text"
          name={i}
          key={i}
          onChange={(e) => handleAnswerChange(e)}
          placeholder={`pregunta ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default MultiChoice;
