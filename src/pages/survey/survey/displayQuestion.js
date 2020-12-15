import SingleChoice from "../question/singleChoice";
import MultiChoice from "../question/multiChoice";
import GradeChoice from "../question/gradeChoice";
import TextInputQuestion from "../question/textInputQuestion";

const DisplayQuestion = (props) => {
  switch (props.type) {
    case "boolean-choice":
    case "single-choice":
      return <SingleChoice question={props.question} index={props.index} />;
    case "multi-choice":
      return <MultiChoice question={props.question} index={props.index} />;
    case "grade-choice":
      return <GradeChoice question={props.question} index={props.index} />;
    case "text-input":
      return (
        <TextInputQuestion question={props.question} index={props.index} />
      );
    default:
      return <h1>hello</h1>;
  }
};

export default DisplayQuestion;
