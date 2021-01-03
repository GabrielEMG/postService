import React from "react";
import "./fixingDoughnutToShowText";
import GradeChoiceCharts from "./types/gradeChoiceCharts";
import InputTextDisplay from "./types/inputTextDisplay";
import MultiChoiceCharts from "./types/multiChoiceCharts";
import SingleChoiceCharts from "./types/singleChoiceCharts";

const QuestionChart = (props) => {
  const displayCharts = (type, data) => {
    switch (type) {
      case "boolean-choice":
      case "single-choice":
        return (
          <SingleChoiceCharts
            question={props.question}
            data={data}
            date={props.date}
          />
        );
      case "multi-choice":
        return (
          <MultiChoiceCharts
            question={props.question}
            data={data}
            date={props.date}
          />
        );
      case "grade-choice":
        return (
          <GradeChoiceCharts
            question={props.question}
            data={data}
            date={props.date}
          />
        );
      case "textfield-input":
        return (
          <InputTextDisplay
            question={props.question}
            data={data}
            date={props.date}
          />
        );
      default:
        return <p>{type}</p>;
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        position: "relative",
        width: "100%",
        boxShadow: "4px 4px 8px 1px rgba(0,0,0,0.4)",
        borderRadius: 10,
      }}
    >
      {displayCharts(props.question.type, props.data)}
    </div>
  );
};

export default QuestionChart;
