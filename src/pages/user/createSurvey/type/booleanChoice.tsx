import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CustomInputText from "../../../../components/customInputText";

type Question = {
  title: string;
  type: string;
  index: number;
  answers: string[];
};

const BooleanChoice: React.FC<{ count: number }> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const [question, setQuestion] = React.useState<Question>({
    title: "",
    type: "boolean-choice",
    index: props.count,
    answers: ["Si", "No"],
  });

  const handleTitleChange: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  React.useEffect(() => {
    dispatch({
      type: "BOOLEAN_CHOICE_QUESTION",
      payload: question,
    });
  }, [question, dispatch]);

  return (
    <Container className="mt-2">
      <CustomInputText
        label="Título de pregunta"
        placeholder="Introduce el título de la pregunta acá"
        name="title"
        setState={handleTitleChange}
      />
    </Container>
  );
};

export default BooleanChoice;
