import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomSelector from "../../../components/customSelector";
import { useSelector } from "react-redux";
import "../../../components/customSelector/customSelector.css";
import ButtonWithLoad from "../../../components/buttonWithLoad";
import { firebase } from "../../../firebase";
import { Link } from "react-router-dom";
import RequestStatus from "./requestStatus";

const requestRange = {
  min: 100,
  max: 1000,
  step: 50,
};

type Survey = {
  title: string;
  key: string;
};

type User = {
  email: string;
  uid: string;
  surveys: Survey[];
  business: string;
  region: string;
  comuna: string;
  location: string;
};

const initialState = {
  key: "",
  title: "",
  email: "",
  uid: "",
  business: "",
  region: "",
  comuna: "",
  location: "",
  quantity: requestRange.min,
  starting: false,
  solved: false,
  responseComment: "",
  cardSended: false,
  date: new Date().toString(),
  paid: false,
};

const Request: React.FC = (): JSX.Element => {
  const [state, setState] = React.useState(initialState);
  const [appState, setAppState] = React.useState({
    error: "",
    isLoading: false,
  });

  const user: User = useSelector((selector: any): User => selector.user);

  React.useEffect(() => {
    setState((prev) => ({
      ...prev,
      email: user.email,
      uid: user.uid,
      business: user.business,
      region: user.region,
      comuna: user.comuna,
      location: user.location,
    }));
  }, [user]);

  const selectSurvey: Function = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const survey: any = user.surveys.find((s): any => s.key === e.target.value);

    setState((prev) => ({
      ...prev,
      title: survey.title,
      key: survey.key,
    }));
  };

  const handleSetNumber: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setState((prev) => ({ ...prev, quantity: JSON.parse(e.target.value) }));
  };

  const handleSendRequest: Function = async (): Promise<void> => {
    try {
      if (!state.title || !state.key)
        throw new Error("No haz seleccionado una encuesta");
      setAppState((prev) => ({ ...prev, isLoading: true }));
      const key = firebase.database().ref("requests").push().key;
      await firebase.database().ref(`requests/${key}`).set(state);
      await firebase.database().ref(`user/${state.uid}/requests/${key}`).set({
        quantity: state.quantity,
        surveyCode: state.key,
        surveyTitle: state.title,
        starting: false,
        solved: false,
        responseComment: "",
        cardSended: state.cardSended,
        date: state.date,
      });
      setState(() => ({
        ...initialState,
        email: user.email,
        uid: user.uid,
        business: user.business,
        region: user.region,
        comuna: user.comuna,
        location: user.location,
      }));
      setAppState((prev) => ({ error: "", isLoading: false }));
      alert("La peticion se ha enviado satisfactoriamente");
    } catch (err) {
      setState(() => ({
        ...initialState,
        email: user.email,
        uid: user.uid,
        business: user.business,
        region: user.region,
        comuna: user.comuna,
        location: user.location,
      }));
      setAppState((prev) => ({ ...prev, error: err.message }));
      alert(err.message);
    }
  };

  return (
    <Container>
      <Col>
        <Row className="justify-content-center my-4">
          <h4>Solicitar tarjetas</h4>
        </Row>
        <Row className="mt-4">
          <p>
            Las tarjetas serán enviadas a la región de {state.region}, en la
            comuna de {state.comuna}, en la dirección {state.location}. Si la
            locación no coincide con la suya, modifique los campos
            <Link style={{ marginLeft: 5 }} to="/user/perfil">
              HACIENDO CLICK AQUÍ
            </Link>
          </p>
        </Row>
        <Row className="justify-content-center my-4">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Row className="justify-content-center">Encuesta</Row>
            <Row>
              <CustomSelector
                onChange={selectSurvey}
                value={state.key}
                label="Seleccionar encuesta"
              >
                {user.surveys.map(
                  (survey: Survey, i: number): JSX.Element => (
                    <option key={i} value={survey.key}>
                      {survey.title}
                    </option>
                  )
                )}
              </CustomSelector>
            </Row>
            <Row className="justify-content-center mt-4">
              Cantidad de tarjetas: {state.quantity}
            </Row>
            <Row className="justify-content-center">
              (min {requestRange.min}, max {requestRange.max})
            </Row>
            <Row className="justify-content-center">
              <input
                style={{
                  width: "100%",
                  cursor: "initial",
                  height: 50,
                  backgroundColor: "red",
                }}
                color="red"
                type="range"
                step={requestRange.step}
                className="selector app-colors"
                value={state.quantity}
                min={requestRange.min}
                max={requestRange.max}
                onChange={(e) => handleSetNumber(e)}
              />
            </Row>
            <Row className="mt-4">
              <ButtonWithLoad
                label="Enviar solicitud"
                action={handleSendRequest}
                condition={appState.isLoading}
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <RequestStatus />
        </Row>
      </Col>
    </Container>
  );
};

export default Request;
