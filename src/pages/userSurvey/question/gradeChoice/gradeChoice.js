import React, { useState } from "react";
import { useDispatch } from "react-redux";

const GradeChoice = (props) => {
  const [inputValue, setInputValue] = useState(5);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>{props.question.title}</h1>
      <input
        type="range"
        min={1}
        max={10}
        defaultValue={5}
        onChange={(e) => handleChange(e)}
      />
      <p>{inputValue}</p>
    </div>
  );
};

export default GradeChoice;
