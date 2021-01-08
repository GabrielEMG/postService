import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CustomInputText from "../../../../components/customInputText";
import SelectForm from "../../../../components/selectForm";

type Question = {
  title: string;
  answers: string[];
  type: string;
  index: number;
};

const SingleChoice: React.FC<{ count: number }> = (props): JSX.Element => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState<number>(2);
  const [question, setQuestion] = React.useState<Question>({
    title: "",
    answers: [],
    type: "single-choice",
    index: props.count,
  });

  React.useEffect(() => {
    setQuestion((prev) => {
      let newAns: string[] = prev.answers;
      while (newAns.length > inputs) newAns.pop();
      while (newAns.length < inputs) newAns.push("");
      return { ...prev, answers: newAns };
    });
  }, [inputs]);

  const handleTitleChange: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(
      (prev: Question): Question => {
        return { ...prev, title: e.target.value };
      }
    );
  };
  const handleAnswerChange: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(
      (prev: Question): Question => {
        let newArr: string[] = prev.answers;
        newArr[JSON.parse(e.target.name)] = e.target.value;
        return { ...prev, answers: newArr };
      }
    );
  };

  React.useEffect(() => {
    dispatch({
      type: "SINGLE_CHOICE_QUESTION",
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
      <SelectForm label="Cantidad de respuestas" setState={setInputs}>
        {new Array(5).fill("").map((e: string, i: number) => (
          <option key={i} value={i + 2}>
            {i + 2} respuestas
          </option>
        ))}
      </SelectForm>

      {new Array(inputs).fill("").map((e: string, i: number) => (
        <CustomInputText
          key={i}
          label={`respuesta ${i + 1}`}
          placeholder="Introduce la respuesta acá"
          name={JSON.stringify(i)}
          setState={handleAnswerChange}
        />
      ))}
    </Container>
  );
};

export default SingleChoice;
