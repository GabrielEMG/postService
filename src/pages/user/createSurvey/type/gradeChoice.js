import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const GradeChoice = (props) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({
    title: "",
    type: "grade-choice",
    index: props.count,
  });

  const handleChange = (e) => {
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
    <div>
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="Título"
      />
    </div>
  );
};

export default GradeChoice;
