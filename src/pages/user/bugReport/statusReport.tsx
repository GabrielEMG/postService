import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../helpers/dateHelper";
import { firebase } from "../../../firebase";

type Report = {
  read: boolean;
  response: string;
  solved: boolean;
  text: string;
  type: string;
};

const StatusReport: React.FC = (): JSX.Element => {
  const reports = useSelector((selector: any) => selector.user.bugReports);
  const uid = useSelector((selector: any) => selector.user.uid);

  const reportArr: any[] = reports
    ? Object.keys(reports).map(
        (key: string): Report => {
          let report = reports[key];
          report.key = key;
          return report;
        }
      )
    : [];

  const arrSort: any[] = reportArr
    ? reportArr.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  const handleDeleteReport: Function = (key: string): void => {
    firebase.database().ref(`user/${uid}/bugReports/${key}`).remove();
    firebase.database().ref(`bugReports/${key}`).remove();
    console.log(key);
  };

  const display = arrSort.map((r, i) => (
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
  ));

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
