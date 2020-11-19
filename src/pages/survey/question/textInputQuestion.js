import React from "react";
import { useDispatch } from "react-redux";

const TextInputQuestion = (props) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_TEXTINPUT_QUESTION_ANSWER",
      payload: {
        questionId: props.question.index,
        answer: e.target.value,
      },
    });
  };

  return (
    <div>
      <h1>{props.question.title}</h1>
      <input
        type="text"
        placeholder="Escribe una respuesta"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default TextInputQuestion;
