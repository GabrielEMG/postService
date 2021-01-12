import React from "react";
import { firebase } from "../../../firebase";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../helpers/dateHelper";
import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

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
  const uid = useSelector((selector: any) => selector.user.uid);
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

  const handleDeleteReport: Function = (key: string): void => {
    firebase.database().ref(`user/${uid}/bugReports/${key}`).remove();
    firebase.database().ref(`bugReports/${key}`).remove();
  };

  const display: JSX.Element[] | JSX.Element =
    arrDisplay.length > 0 ? (
      arrDisplay.map(
        (r: Report, i: number): JSX.Element => (
          <Row key={i}>
            <FontAwesomeIcon
              icon={r.solved ? faCheckCircle : faExclamationTriangle}
              style={{ color: r.solved ? "green" : "yellow" }}
            />
            <p>{formatDate(new Date(r.date))}</p>
            <p>Leido: {r.read ? "Si" : "No"}</p>
            <p>Resuelto: {r.solved ? "Si" : "No"}</p>
            <p>{r.response && r.response}</p>
            <p>Reporte: {r.text.substring(0, 200)}</p>
            <p onClick={() => handleDeleteReport(r.key)}>eliminar</p>
            {JSON.stringify(r)}
          </Row>
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
