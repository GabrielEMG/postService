import React from "react";
import { useDispatch } from "react-redux";

const MultiChoice = (props) => {
  const dispatch = useDispatch();
  const handleClick = (index, key) => {
    dispatch({
      type: "UPDATE_MULTI_QUESTION_ANSWER",
      payload: { questionId: index, answer: key },
    });
  };
  return (
    <div>
      <h1>{props.question.title}</h1>
      <div>
        {Object.keys(props.question.answers).map((key, id) => (
          <div key={id} onClick={() => handleClick(props.question.index, key)}>
            <input
              onChange={() => {}}
              checked={props.question.answers[key]}
              type="checkbox"
            />
            <p>{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiChoice;
