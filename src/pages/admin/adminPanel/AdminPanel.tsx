import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import PaperBG from "../../../components/paperBG";
import BooleanIcons from "../../../components/booleanIcons";
import { firebase } from "../../../firebase";
import { dateFormat } from "../../../helpers/dateFormat";

type Request = {
  business: string;
  cardSended: boolean;
  comuna: string;
  date: Date;
  email: string;
  key: string;
  location: string;
  quantity: number;
  region: string;
  responseComment: string;
  solved: boolean;
  starting: boolean;
  ready: boolean;
  title: string;
  uid: string;
  paid: boolean;
};

const AdminPanel: React.FC = (): JSX.Element => {
  const requests: Request[] =
    useSelector((selector: any) => selector.admin.requests) || [];

  const handleStart: Function = async (
    uid: string,
    key: string,
    starting: boolean
  ): Promise<void> => {
    try {
      console.log(key);
      await firebase
        .database()
        .ref(`requests/${key}`)
        .update({ starting: !starting, ready: false, cardSended: false });
      await firebase
        .database()
        .ref(`user/${uid}/requests/${key}`)
        .update({ starting: !starting, ready: false, cardSended: false });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFinish: Function = async (
    uid: string,
    key: string,
    starting: boolean,
    ready: boolean
  ) => {
    try {
      await firebase
        .database()
        .ref(`requests/${key}`)
        .update({ ready: !ready, starting: true, cardSended: false });
      await firebase
        .database()
        .ref(`user/${uid}/requests/${key}`)
        .update({ ready: !ready, starting: true, cardSended: false });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSend: Function = async (
    uid: string,
    key: string,

    cardSended: boolean
  ) => {
    try {
      await firebase
        .database()
        .ref(`requests/${key}`)
        .update({ cardSended: !cardSended, starting: true, ready: true });
      await firebase
        .database()
        .ref(`user/${uid}/requests/${key}`)
        .update({ cardSended: !cardSended, starting: true, ready: true });
    } catch (err) {
      alert(err.message);
    }
  };

  const requestDisplay: JSX.Element[] = requests.map(
    (r: Request, key: number): JSX.Element => {
      return (
        <PaperBG key={key}>
          <Col className="ml-3">
            <Row>fecha: {dateFormat(new Date(r.date))}</Row>
            <Row>codigo de compra: {r.key}</Row>
            <Row>email: {r.email}</Row>
            <Row>uid: {r.uid}</Row>
            <Row>empresa: {r.business}</Row>
            <Row>titulo de encuesta: {r.title}</Row>
            <Row>codigo de encuesta: {r.key}</Row>
            <Row>region: {r.region}</Row>
            <Row>comuna: {r.comuna}</Row>
            <Row>locacion: {r.location}</Row>
            <Row className="align-items-center">
              pagado: <BooleanIcons value={r.paid} />
            </Row>
            <Row
              onClick={() =>
                handleStart(r.uid, r.key, r.starting, r.ready, r.cardSended)
              }
              className="align-items-center"
            >
              Iniciado: <BooleanIcons value={r.starting} />
            </Row>
            <Row
              onClick={() =>
                handleFinish(r.uid, r.key, r.starting, r.ready, r.cardSended)
              }
              className="align-items-center"
            >
              Finalizado: <BooleanIcons value={r.ready} />
            </Row>
            <Row
              onClick={() => handleSend(r.uid, r.key, r.cardSended)}
              className="align-items-center"
            >
              enviado: <BooleanIcons value={r.cardSended} />
            </Row>
          </Col>
        </PaperBG>
      );
    }
  );

  return (
    <Container>
      <Col>
        <Row className="justify-content-center my-4">
          <h4>Pedidos de tarjetas</h4>
        </Row>
        <Row>{requestDisplay}</Row>
      </Col>
    </Container>
  );
};

export default AdminPanel;
