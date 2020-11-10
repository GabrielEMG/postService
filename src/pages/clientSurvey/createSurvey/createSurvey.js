import React, { useEffect, useState } from "react";
import CreateQuestion from "./createQuestion";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";
import { useHistory } from "react-router-dom";

const CreateSurvey = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((selector) => selector.createSurvey);
  const email = useSelector((selector) => selector.user.email);
  const handleTitleChange = (e) => {
    dispatch({
      type: "UPDATE_TITLE_SURVEY",
      payload: e.target.value,
    });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_OWNER_SURVEY",
      payload: email,
    });
  }, [email]);

  useEffect(() => {
    setCount(state.questions.length);
    console.log(state);
  }, [state]);

  const handleUploadSurvey = async () => {
    await db
      .collection("survey")
      .doc()
      .set(state)
      .then(alert("survey sended"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <p>createSurvey</p>

      <input
        type="text"
        name="title"
        onChange={(e) => handleTitleChange(e)}
        placeholder="Título de encuesta"
      />

      <div>
        {new Array(count).fill().map((e, i) => (
          <CreateQuestion key={i} count={i} />
        ))}
      </div>

      <div>
        <button onClick={() => dispatch({ type: "ADD_QUESTION" })}>
          Agregar pregunta
        </button>
        <button onClick={() => dispatch({ type: "REMOVE_QUESTION" })}>
          Borrar pregunta
        </button>
      </div>

      <div>
        <button onClick={() => handleUploadSurvey()}>subir questionario</button>
      </div>
    </div>
  );
};

export default CreateSurvey;
