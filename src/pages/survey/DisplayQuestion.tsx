import SingleChoice from "./question/singleChoice";
import MultiChoice from "./question/multiChoice";
import GradeChoice from "./question/gradeChoice";
import TextInputQuestion from "./question/textInputQuestion";

type QuestionType = {
  title: string;
  index: number;
  type: string;
  answers?: any;
};

type Props = {
  question: QuestionType;
};

const DisplayQuestion: React.FC<Props> = (props): JSX.Element => {
  switch (props.question.type) {
    case "boolean-choice":
    case "single-choice":
      return <SingleChoice question={props.question} />;
    case "multi-choice":
      return <MultiChoice question={props.question} />;
    case "grade-choice":
      return <GradeChoice question={props.question} />;
    case "textfield-input":
      return <TextInputQuestion question={props.question} />;
    default:
      return <h1>No existe el tipo {props.question.type}</h1>;
  }
};

export default DisplayQuestion;
