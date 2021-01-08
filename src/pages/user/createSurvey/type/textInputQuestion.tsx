import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import CustomInputText from "../../../../components/customInputText";

type Question = {
  title: string;
  type: string;
  index: number;
};

const TextInputQuestion: React.FC<{ count: number }> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const [question, setQuestion] = React.useState<Question>({
    title: "",
    type: "textfield-input",
    index: props.count,
  });

  React.useEffect(() => {
    dispatch({
      type: "TEXT_INPUT_QUESTION",
      payload: question,
    });
  }, [question, dispatch]);

  const handleTitleChange: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(
      (prev: Question): Question => {
        return { ...prev, title: e.target.value };
      }
    );
  };

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

export default TextInputQuestion;
