import React from "react";
import { firebase } from "../../../firebase";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateFormat } from "../../../helpers/dateFormat";
import {
  faCheckCircle,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PaperBG from "../../../components/paperBG";

type Report = {
  read: boolean;
  response: string;
  solved: boolean;
  text: string;
  type: string;
  date: Date;
  key?: string;
};

const StatusReport: React.FC = (): JSX.Element => {
  const user = useSelector((selector: any) => selector.user);
  const [arrDisplay, setArrDisplay] = React.useState<Report[]>([]);

  React.useEffect(() => {
    setArrDisplay(() => {
      const r: Report[] = user.bugReports;
      const arr: Report[] = r
        ? r.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        : [];
      return arr ? arr : [];
    });
  }, [user.bugReports]);

  const handleDeleteReport: Function = async (key: string): Promise<void> => {
    try {
      await firebase
        .database()
        .ref(`user/${user.uid}/bugReports/${key}`)
        .remove();
      await firebase.database().ref(`bugReports/${key}`).remove();
      alert("El reporte se ha eliminado exitosamente");
    } catch (err) {
      alert(err.message);
    }
  };

  const display: JSX.Element[] | JSX.Element =
    arrDisplay.length > 0 ? (
      arrDisplay.map(
        (r: Report, i: number): JSX.Element => (
          <PaperBG style={{ marginTop: 40, marginBottom: 40 }} key={i}>
            <Col xs={12} className="p-2">
              <FontAwesomeIcon
                onClick={() => handleDeleteReport(r.key)}
                icon={faTrash}
                style={{
                  cursor: "pointer",
                  height: 30,
                  width: 30,
                  position: "absolute",
                  top: -20,
                  right: -20,
                  color: "grey",
                }}
              />
              <FontAwesomeIcon
                icon={r.solved ? faCheckCircle : faExclamationTriangle}
                style={{
                  color: r.solved ? "green" : "yellowgreen",
                  position: "absolute",
                  top: -30,
                  left: -30,
                  height: 40,
                  width: 40,
                }}
              />
              <Row>
                <Col className="ml-3">
                  <Row>Codigo: {r.key}</Row>
                  <Row>Fecha: {dateFormat(new Date(r.date))}</Row>
                  <Row>Tipo: {r.type}</Row>
                  <Row>Leido: {r.read ? "Si" : "No"}</Row>
                  <Row>Resuelto: {r.solved ? "Si" : "No"}</Row>
                  <Row>{r.response && r.response}</Row>
                  <Row>
                    Reporte:
                    {` ${r.text.substring(0, 200)}${
                      r.text.length > 200 ? "..." : ""
                    }`}
                  </Row>
                </Col>
              </Row>
            </Col>
          </PaperBG>
        )
      )
    ) : (
      <Row>No se han hecho reportes</Row>
    );

  return (
    <Container>
      <Col>
        <Row className="justify-centent-center">
          <h5>Estado de reportes</h5>
        </Row>

        <Row>
          <Col>{display}</Col>
        </Row>
      </Col>
    </Container>
  );
};

export default StatusReport;
