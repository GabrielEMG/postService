import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./bugReport.css";
import { firebase } from "../../../firebase";
import { useSelector } from "react-redux";
import ButtonWithLoad from "../../../components/buttonWithLoad";
import CustomSelector from "../../../components/customSelector";

type Report = {
  user: string;
  type: string;
  text: string;
  anonymous: boolean;
  isSending: boolean;
  error: string;
};

const initialState: Report = {
  user: "",
  type: "",
  text: "",
  anonymous: false,
  isSending: false,
  error: "",
};

const BugReport: React.FC = (): JSX.Element => {
  const [report, setReport] = React.useState<Report>(initialState);

  const user = useSelector((selector: any): string => selector.user.email);

  React.useEffect(() => {
    setReport((prev) => ({ ...prev, user }));
  }, [user]);

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

  const handleSendReport: Function = async (): Promise<any> => {
    try {
      if (report.type === "") {
        setReport((prev) => ({
          ...prev,
          error: "debes elegir un tipo de reporte",
        }));
        return null;
      }
      if (report.text.length < 10) {
        setReport((prev) => ({
          ...prev,
          error: "El texto que quieres enviar es muy corto",
        }));
        return null;
      }
      if (report.anonymous) {
        setReport((prev) => ({ ...prev, user: "Anonimo" }));
      }
      setReport((prev) => ({ ...prev, isSending: true }));
      await firebase
        .database()
        .ref("reports")
        .push({
          anonymous: report.anonymous,
          read: false,
          solved: false,
          text: report.text,
          type: report.type,
          user: report.user,
        })
        .then(() => setReport(initialState));

      alert("Report enviado exitosamente! muchas gracias :)");
    } catch (err) {
      alert(err.message);
      setReport((prev) => ({ ...prev, error: err.message, isSending: false }));
    }
  };

  console.log(report);

  return (
    <Container>
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
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Row className="mt-4">
              <CustomSelector
                onChange={handleSelect}
                value={report.type}
                label="Selecciona una opción"
              >
                <option value="error">Reportar un error</option>
                <option value="complain">Reportar una queja</option>
                <option value="comentary">Dejanos un comentario</option>
                <option value="feature">Solicitar nueva funcionalidad</option>
                <option value="other">Otros</option>
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
                rows={15}
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
      </Col>
    </Container>
  );
};

export default BugReport;
