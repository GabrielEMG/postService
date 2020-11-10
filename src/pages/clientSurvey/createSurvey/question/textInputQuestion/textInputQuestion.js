import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
  }, [title]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) =>
          setQuestion((prev) => {
            return { ...prev, title: e.target.value };
          })
        }
        placeholder="Título de la pregunta"
      />
    </div>
  );
};

export default TextInputQuestion;
