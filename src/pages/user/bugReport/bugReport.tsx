import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./bugReport.css";
import { firebase } from "../../../firebase";
import { useSelector } from "react-redux";
import ButtonWithLoad from "../../../components/buttonWithLoad";
import CustomSelector from "../../../components/customSelector";
import StatusReport from "./statusReport";

type Report = {
  user: string;
  uid: string;
  type: string;
  text: string;
  anonymous: boolean;
  isSending: boolean;
  isSended: boolean;
  error: string;
};

const initialState: Report = {
  user: "",
  uid: "",
  type: "",
  text: "",
  anonymous: false,
  isSending: false,
  isSended: false,
  error: "",
};

const BugReport: React.FC = (): JSX.Element => {
  const [report, setReport] = React.useState<Report>(initialState);
  const user = useSelector((selector: any): any => selector.user);

  React.useEffect(() => {
    setReport((prev) => ({ ...prev, user: user.email, uid: user.uid }));
  }, [user.email, user.uid]);

  React.useEffect(() => {
    if (report.isSended) {
      setReport((prev) => ({
        ...initialState,
        user: prev.user,
        uid: prev.uid,
      }));
      alert("Report enviado exitosamente! muchas gracias :)");
    }
  }, [report.isSended]);

  const handleSelect: Function = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setReport(
      (prev: Report): Report => ({ ...prev, type: e.target.value, error: "" })
    );
  };

  const setAnonymous: Function = (): void => {
    setReport((prev) => ({ ...prev, anonymous: !prev.anonymous, error: "" }));
  };

  const handleTextarea: Function = (e: any): void => {
    setReport((prev) => ({ ...prev, text: e.target.value, error: "" }));
  };

  const handleSendReport: Function = async (): Promise<void> => {
    try {
      if (report.type === "")
        throw new Error("debes elegir un tipo de reporte");

      if (report.text.length < 10)
        throw new Error("El texto que quieres enviar es muy corto");

      if (report.anonymous) {
        setReport((prev) => ({ ...prev, user: "Anonimo" }));
      }
      setReport((prev) => ({ ...prev, isSending: true }));
      const key = firebase.database().ref("bugReports").push().key;
      await firebase
        .database()
        .ref(`user/${report.uid}/bugReports/${key}`)
        .set({
          uid: report.uid,
          key: key,
          read: false,
          solved: false,
          text: report.text,
          type: report.type,
          response: "",
          date: new Date().toString(),
        });
      await firebase.database().ref(`bugReports/${key}`).set({
        uid: report.uid,
        anonymous: report.anonymous,
        read: false,
        solved: false,
        text: report.text,
        type: report.type,
        user: report.user,
        response: "",
        date: new Date().toString(),
        key: key,
      });
      setReport((prev) => ({ ...prev, isSending: false, isSended: true }));
    } catch (err) {
      setReport((prev) => ({ ...prev, error: err.message, isSending: false }));
    }
  };

  return (
    <Container fluid>
      <Col style={{ minHeight: "100vh" }}>
        <Row className="justify-content-center my-4">
          <h4>Reporta un error</h4>
        </Row>
        <Row className="mx-4">
          Si deseas reportar un error, dejar una queja, comentar sobre tu
          experiencia en la plataforma, solicitar una nueva funcionalidad o
          hasta un "buenos días". Nos interesa lo que piensas
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={7} xl={4}>
            <Row className="mt-4">
              <CustomSelector
                onChange={handleSelect}
                value={report.type}
                label="Selecciona una opción"
              >
                <option value="error">Reportar un error</option>
                <option value="queja">Reportar una queja</option>
                <option value="comentario">Dejanos un comentario</option>
                <option value="nueva funcionalidad">
                  Solicitar nueva funcionalidad
                </option>
                <option value="otros">Otros</option>
              </CustomSelector>
            </Row>
            <Row className="align-items-center my-4">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={report.anonymous}
                  onChange={() => setAnonymous()}
                  style={{ marginRight: 5 }}
                />
                Enviar como anónimo
              </label>
            </Row>
            <Row>
              <textarea
                value={report.text}
                onChange={(e) => handleTextarea(e)}
                rows={10}
                className="txtarea"
                placeholder="Escribe lo que quieres enviar acá"
              />
            </Row>
            <Row className="my-4">
              <ButtonWithLoad
                condition={report.isSending}
                isDisabled={false}
                action={handleSendReport}
                label="Enviar encuesta"
              />
            </Row>
            <Row className="justify-content-center">
              <p style={{ color: "#932432" }}>{report.error}</p>
            </Row>
          </Col>
        </Row>
        <Row className="my-2 mb-4">
          <StatusReport />
        </Row>
      </Col>
    </Container>
  );
};

export default BugReport;
