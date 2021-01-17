import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import PaperBG from "../../../components/paperBG";
import BooleanIcons from "../../../components/booleanIcons";
import { firebase } from "../../../firebase";

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
  title: string;
  uid: string;
  paid: boolean;
  code: string;
};

const AdminPanel: React.FC = (): JSX.Element => {
  const requests: Request[] =
    useSelector((selector: any) => selector.admin.requests) || [];

  const handleStart: Function = async (
    uid: string,
    code: string,
    starting: boolean
  ): Promise<void> => {
    try {
      console.log(code);
      await firebase
        .database()
        .ref(`requests/${code}`)
        .update({ starting: !starting });
      await firebase
        .database()
        .ref(`user/${uid}/requests/${code}`)
        .update({ starting: !starting });
      if (starting) {
        alert("Se ha cancelado el inicio de la peticion");
      } else {
        alert("Se ha actualizado la peticion a INICIADA");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const requestDisplay: JSX.Element[] = requests.map(
    (r: Request, key: number): JSX.Element => {
      return (
        <PaperBG key={key}>
          <Col>
            <Row>fecha: {r.date}</Row>
            <Row>codigo de compra: {r.code}</Row>
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
              onClick={() => handleStart(r.uid, r.code, r.starting)}
              className="align-items-center"
            >
              Iniciado: <BooleanIcons value={r.starting} />
            </Row>
            <Row className="align-items-center">
              enviado: <BooleanIcons value={r.cardSended} />
            </Row>
          </Col>
        </PaperBG>
      );
    }
  );

  return (
    <Container>
      <Row>
        <h4>Pedidos de tarjetas</h4>
      </Row>
      <Row>{requestDisplay}</Row>
    </Container>
  );
};

export default AdminPanel;
