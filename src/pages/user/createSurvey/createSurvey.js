import React, { useEffect, useState } from "react";
import CreateQuestion from "./createQuestion";
import { useDispatch, useSelector } from "react-redux";
import { db, firebase } from "../../../firebase";
import {
  Container,
  FormControl,
  Row,
  InputGroup,
  Button,
} from "react-bootstrap";

const CreateSurvey = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((selector) => selector.createSurvey);
  const user = useSelector((selector) => selector.user);
  const handleTitleChange = (e) => {
    dispatch({
      type: "UPDATE_TITLE_SURVEY",
      payload: e.target.value,
    });
  };
  console.log(count);
  useEffect(() => {
    dispatch({
      type: "UPDATE_OWNER_SURVEY",
      payload: user.uid,
    });
  }, [user.uid]);

  useEffect(() => {
    setCount(state.questions.length);
    console.log(state);
  }, [state]);

  const handleUploadSurvey = async () => {
    await db
      .collection("user")
      .doc(user.uid)
      .update({
        surveys: firebase.firestore.FieldValue.arrayUnion(state),
      });
    await db
      .collection("admin")
      .doc("LHaVyqThivcUKTBgL67e")
      .update({
        surveys: firebase.firestore.FieldValue.arrayUnion({
          ...state,
          email: user.email,
          uid: user.uid,
        }),
      });
  };

  return (
    <Container className="justify-content-center">
      <Row className="border p-4 m-3 justify-content-center">
        <h1>Crear una encuesta</h1>
      </Row>
      <Row className="border p-4 m-3 justify-content-center">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Título de encuesta</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            name="title"
            onChange={(e) => handleTitleChange(e)}
            placeholder="Introduce el título de la encuesta acá"
          />
        </InputGroup>
      </Row>

      <Row>
        {new Array(count).fill().map((e, i) => (
          <CreateQuestion key={i} count={i} />
        ))}
      </Row>

      <Row className="border p-4 m-3 justify-content-center">
        <Button
          className="mr-4"
          onClick={() => dispatch({ type: "ADD_QUESTION" })}
        >
          Agregar una pregunta
        </Button>
        {count > 0 && (
          <Button
            className="ml-4"
            onClick={() => dispatch({ type: "REMOVE_QUESTION" })}
          >
            Borrar una pregunta
          </Button>
        )}
      </Row>
      <Row className="justify-content-center border p-4 m-3">
        {count >= 2 && (
          <Button onClick={() => handleUploadSurvey()}>
            subir questionario
          </Button>
        )}
      </Row>
    </Container>
  );
};

export default CreateSurvey;
