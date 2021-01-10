import React from "react";
import CreateQuestion from "./createQuestion";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../../../firebase";
import PaperBG from "../../../components/paperBG";
import { FormControl, Col, Row, InputGroup, Button } from "react-bootstrap";
import useReadyToSend from "./useReadyToSend";

const CreateSurvey: React.FC = (): JSX.Element => {
  const [count, setCount] = React.useState<number>(4);
  const dispatch = useDispatch();
  const state = useSelector((selector: any): any => selector.createSurvey);
  const user = useSelector((selector: any): any => selector.user);
  const readyToSend = useReadyToSend();
  const handleTitleChange = (e: any) => {
    dispatch({
      type: "UPDATE_TITLE_SURVEY",
      payload: e.target.value,
    });
  };

  React.useEffect(() => {
    while (state.questions.length < count) dispatch({ type: "ADD_QUESTION" });
  }, [state.questions.length, count, dispatch]);

  React.useEffect(() => {
    dispatch({
      type: "UPDATE_OWNER_SURVEY",
      payload: user.uid,
    });
  }, [dispatch, user.uid]);

  React.useEffect(() => {
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
    <div
      className="justify-content-center app-colors p-3"
      style={{ width: "100%" }}
    >
      <Col>
        <PaperBG>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </PaperBG>
        <PaperBG>
          <Row>
            {new Array(count).fill("").map((e: string, i: number) => (
              <CreateQuestion key={i} count={i} last={count} />
            ))}
          </Row>
        </PaperBG>

        <PaperBG>
          <Row>
            <Col>
              <Row className="my-2">
                <Col>
                  <Button
                    className="app-button"
                    disabled={count <= 4}
                    onClick={() => dispatch({ type: "REMOVE_QUESTION" })}
                  >
                    Borrar una pregunta
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="app-button"
                    disabled={count >= 10}
                    onClick={() => {
                      dispatch({ type: "ADD_QUESTION" });
                    }}
                  >
                    Agregar una pregunta
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="my-2">
                  <Button
                    className="app-button"
                    onClick={() => handleUploadSurvey()}
                    disabled={!readyToSend || count < 4}
                  >
                    subir questionario
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </PaperBG>
      </Col>
    </div>
  );
};

export default CreateSurvey;
