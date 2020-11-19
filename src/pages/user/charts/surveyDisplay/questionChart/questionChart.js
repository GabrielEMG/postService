import React from "react";
import GradeChoiceCharts from "./types/gradeChoiceCharts";
import InputTextDisplay from "./types/inputTextDisplay";
import MultiChoiceCharts from "./types/multiChoiceCharts";
import SingleChoiceCharts from "./types/singleChoiceCharts";
import BooleanChoiceCharts from "./types/booleanChoiceCharts";

const QuestionChart = (props) => {
  const displayCharts = (type, data) => {
    switch (type) {
      case "single-choice":
        return <SingleChoiceCharts question={props.question} data={data} />;
      case "multi-choice":
        return <MultiChoiceCharts question={props.question} data={data} />;
      case "grade-choice":
        return <GradeChoiceCharts question={props.question} data={data} />;
      case "text-input":
        return <InputTextDisplay question={props.question} data={data} />;
      case "boolean-choice":
        return <BooleanChoiceCharts question={props.question} data={data} />;
      default:
        console.log(type);
        return <p>{type}</p>;
    }
  };

  console.log(props.question.type);

  return (
    <div>
      <h1>{props.question.title}</h1>

      {displayCharts(props.question.type, props.data)}
    </div>
  );
};

export default QuestionChart;
