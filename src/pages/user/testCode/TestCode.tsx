import React from "react";
import QRCode from "qrcode.react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomSelector from "../../../components/customSelector";
import { firebase } from "../../../firebase";
import ButtonWithLoad from "../../../components/buttonWithLoad";
import { Link } from "react-router-dom";

type Survey = {
  title: string;
  key: string;
  owner: string;
};

const initialValue: Survey = {
  title: "",
  key: "",
  owner: "",
};

const TestCode: React.FC = (): JSX.Element => {
  const userSurveys: Survey[] = useSelector(
    (selector: any) => selector.user.surveys
  );
  const [survey, setSurvey] = React.useState<Survey>(initialValue);
  const [state, setState] = React.useState({
    key: "",
    error: "",
    isLoading: false,
  });

  const handleChange: Function = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const surveySelected: Survey =
      userSurveys.find((us: Survey): boolean => us.key === e.target.value) ||
      initialValue;
    setSurvey(surveySelected);
    setState((prev) => ({ ...prev, isLoading: false, error: "" }));
  };

  const handleCreateQRCode: Function = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: "" }));
      if (survey.title === "" || survey.key === "")
        throw new Error("No has elegido una encuesta");
      const key: string = firebase.database().ref("keys").push().key || "";
      await firebase.database().ref(`keys/${key}`).set({
        key: key,
        owner: survey.owner,
        survey: survey.key,
        responded: false,
        createdAt: new Date(),
      });
      setState({ isLoading: false, key: key, error: "" });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err.message }));
    }
  };

  return (
    <Container>
      <Col>
        <Row className="justify-content-center mt-4">
          <h4>Crea un codigo QR para testear tu Encuesta!</h4>
        </Row>
        <Row className="justify-content-center my-4">
          Selecciona una encuesta y crea un codigo QR con el boton de abajo.
        </Row>
        <Row className="justify-content-center">
          <Col xs={11} md={6} lg={4}>
            <Row>
              <CustomSelector
                value={survey.key}
                label="Selecciona una encuesta"
                onChange={handleChange}
              >
                {userSurveys.map((survey: Survey, key: number) => (
                  <option value={survey.key} key={key}>
                    {survey.title}
                  </option>
                ))}
              </CustomSelector>
            </Row>
            <Row className="mt-3">
              <ButtonWithLoad
                condition={state.isLoading}
                action={handleCreateQRCode}
                label="Crear codigo QR"
              />
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center danger my-3 app-err">
          {state.error}
        </Row>
        {state.key && (
          <>
            <Row className="justify-content-center">
              Escanea el codigo QR para direccionarte a la encuesta y
              responderla!!! (o ingresa al link de abajo)
            </Row>
            <Row className="justify-content-center">
              <Link href="https://survey-realtime.web.app/survey/${state.key}">
                ENLACE DE ENCUESTA
              </Link>
            </Row>
            <Row className="justify-content-center">
              <QRCode
                value={`https://survey-realtime.web.app/survey/${state.key}`}
              />
            </Row>
          </>
        )}
      </Col>
    </Container>
  );
};

export default TestCode;
