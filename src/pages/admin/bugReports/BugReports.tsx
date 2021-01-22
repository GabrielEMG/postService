import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaperBG from "../../../components/paperBG";
import { firebase } from "../../../firebase";
import "./bugReports.css";
import Comment from "./comment";
import { dateFormat } from "../../../helpers/dateFormat";

type BugReport = {
  anonymous: boolean;
  date: Date;
  read: boolean;
  response: string;
  solved: boolean;
  text: string;
  type: string;
  user: string;
  key: string;
  uid: string;
};

const BugReports: React.FC = (): JSX.Element => {
  const reports = useSelector(
    (selector: any): BugReport[] => selector.admin.bugReports
  );

  const handleRead: Function = async (
    uid: string,
    key: string,
    isRead: boolean
  ): Promise<void> => {
    try {
      await firebase
        .database()
        .ref(`bugReports/${key}`)
        .update({ read: !isRead });
      await firebase
        .database()
        .ref(`user/${uid}/bugReports/${key}`)
        .update({ read: !isRead });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSolved: Function = async (
    uid: string,
    key: string,
    isSolved: boolean,
    isRead: boolean
  ): Promise<void> => {
    try {
      if (isRead === false && isSolved === false) {
        handleRead(uid, key, isRead);
      }
      await firebase
        .database()
        .ref(`bugReports/${key}`)
        .update({ solved: !isSolved });
      await firebase
        .database()
        .ref(`user/${uid}/bugReports/${key}`)
        .update({ solved: !isSolved });
    } catch (err) {
      alert(err.message);
    }
  };

  const sendCommentary: Function = async (
    uid: string,
    key: string,
    isRead: boolean,
    isSolved: boolean,
    text: string
  ): Promise<void> => {
    try {
      if (isSolved === false) {
        await handleSolved(uid, key, isSolved, isRead);
      }
      await firebase
        .database()
        .ref(`bugReports/${key}`)
        .update({ response: text });
      await firebase
        .database()
        .ref(`user/${uid}/bugReports/${key}`)
        .update({ response: text });
      alert("Comentario se ha enviado");
    } catch (err) {
      alert(err.message);
    }
  };

  const display: JSX.Element[] = reports.map(
    (report: BugReport): JSX.Element => (
      <Col xs={12}>
        <PaperBG>
          <Col>
            <Row>Fecha: {dateFormat(new Date(report.date))}</Row>
            <Row>Codigo: {report.key}</Row>
            <Row
              style={{ cursor: "pointer" }}
              onClick={() => handleRead(report.uid, report.key, report.read)}
            >
              Leido: {report.read ? "Si" : "No"}
            </Row>
            <Row
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSolved(report.uid, report.key, report.solved, report.read)
              }
            >
              Resuelto: {report.solved ? "Si" : "No"}
            </Row>
            <Row>Tipo: {report.type}</Row>
            <Row>Mensaje: {report.text}</Row>
            <Row>
              Comentario:
              <Comment
                action={sendCommentary}
                value={report.response}
                report={report}
              />
            </Row>
          </Col>
        </PaperBG>
      </Col>
    )
  );

  return (
    <Container>
      <Col>
        <Row className="justify-content-center my-4">
          <h4>bugReports</h4>
        </Row>
        <Row>Reportes</Row>
        <Row>{display}</Row>
      </Col>
    </Container>
  );
};

export default BugReports;
