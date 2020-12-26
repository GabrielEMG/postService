import React, { useEffect, useState } from "react";
import CreateQuestion from "./createQuestion";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../../../firebase";
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

  useEffect(() => {
    dispatch({
      type: "UPDATE_OWNER_SURVEY",
      payload: user.uid,
    });
  }, [dispatch, user.uid]);

  useEffect(() => {
    setCount(state.questions.length);
  }, [state]);

  const handleUploadSurvey = async () => {
    try {
      const key = firebase.database().ref().push().key;
      await firebase
        .database()
        .ref("user/" + user.uid + "/surveys/" + key)
        .set({ ...state, key });
      await firebase
        .database()
        .ref("surveys/" + user.uid + "/" + key)
        .set({ ...state, key });
      dispatch({
        type: "ADD_CREATED_SURVEY",
        payload: { ...state, key },
      });
      alert("sended");
    } catch (err) {
      alert(err.message);
    }
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
