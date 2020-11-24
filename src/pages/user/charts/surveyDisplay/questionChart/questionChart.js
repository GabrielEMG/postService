import React from "react";
import "./fixingDoughnutToShowText";
import GradeChoiceCharts from "./types/gradeChoiceCharts";
import InputTextDisplay from "./types/inputTextDisplay";
import MultiChoiceCharts from "./types/multiChoiceCharts";
import SingleChoiceCharts from "./types/singleChoiceCharts";
import BooleanChoiceCharts from "./types/booleanChoiceCharts";

const QuestionChart = (props) => {
  const displayCharts = (type, data) => {
    switch (type) {
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
      case "text-input":
        return (
          <InputTextDisplay
            question={props.question}
            data={data}
            date={props.date}
          />
        );
      case "boolean-choice":
        return (
          <BooleanChoiceCharts
            question={props.question}
            data={data}
            date={props.date}
          />
        );
      default:
        console.log(type);
        return <p>{type}</p>;
    }
  };

  console.log(props.question.type);

  return (
    <div style={{ marginTop: 20 }}>
      {displayCharts(props.question.type, props.data)}
    </div>
  );
};

export default QuestionChart;
