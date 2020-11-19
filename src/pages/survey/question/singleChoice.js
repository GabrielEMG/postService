import React from "react";
import { useDispatch } from "react-redux";

const SingleChoice = (props) => {
  const dispatch = useDispatch();
  const handleClick = (index, key) => {
    dispatch({
      type: "UPDATE_SINGLE_QUESTION_ANSWER",
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
              type="checkbox"
              onChange={() => {}}
              checked={props.question.answers[key]}
            />

            <p>{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleChoice;
