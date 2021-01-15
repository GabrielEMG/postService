import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaperBG from "../../../components/paperBG";

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
};

const dateFormat: Function = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: number = date.getHours();
  const minutes: number = date.getMinutes();
  return `${hour}:${minutes < 10 ? 0 : ""}${minutes} - ${day}/${
    month < 10 ? 0 : ""
  }${month}/${year}`;
};

const BugReports: React.FC = (): JSX.Element => {
  const reports = useSelector(
    (selector: any): BugReport[] => selector.admin.bugReports
  );

  const handleRead: Function = async (key: string): Promise<void> => {};

  const display: JSX.Element[] = reports.map(
    (report: BugReport): JSX.Element => (
      <Col xs={12}>
        <PaperBG>
          <Col>
            <Row>Fecha: {dateFormat(new Date(report.date))}</Row>
            <Row>tipo: {report.type}</Row>
            <Row>
              leido: {report.read}
              <p onClick={() => handleRead(report.key)}>marcar como leido</p>
            </Row>
          </Col>
        </PaperBG>
      </Col>
    )
  );

  return (
    <Container>
      <Col>
        <Row className="justify-content-center">
          <h4>bugReports</h4>
        </Row>
        <Row>Reportes</Row>
        <Row>{display}</Row>
      </Col>
    </Container>
  );
};

export default BugReports;
