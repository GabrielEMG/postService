import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaperBG from "../../../components/paperBG";

type Request = {
  quantity: number;
  survey: string;
  read: boolean;
  starting: boolean;
  solved: boolean;
  responseComment: string;
  cardSended: boolean;
  date: Date;
};

const RequestStatus: React.FC = (): JSX.Element => {
  const user = useSelector((selector: any) => selector.user);
  const [arrDisplay, setArrDisplay] = React.useState<Request[]>([]);

  React.useEffect(() => {
    setArrDisplay(() => {
      const r: Request[] = user.requests;
      const arr: Request[] = r
        ? r.sort((a, b) => b.date.getTime() - a.date.getTime())
        : [];
      return arr ? arr : [];
    });
  }, [user.requests]);

  const display: JSX.Element[] | JSX.Element = arrDisplay.map(
    (r: Request, i: number): JSX.Element => (
      <PaperBG key={i}>
        <h1>{JSON.stringify(r)}</h1>
      </PaperBG>
    )
  );

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <h5>Estado de solicitudes</h5>
          </Row>

          <Row>
            <Col>{display}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestStatus;
