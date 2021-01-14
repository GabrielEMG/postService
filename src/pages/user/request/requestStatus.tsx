import React from "react";
import { firebase } from "../../../firebase";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaperBG from "../../../components/paperBG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../helpers/dateHelper";
import {
  faCheckCircle,
  faEye,
  faPaperPlane,
  faClock,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

type Request = {
  quantity: number;
  surveyCode: string;
  surveyTitle: string;
  read: boolean;
  starting: boolean;
  solved: boolean;
  responseComment: string;
  cardSended: boolean;
  date: Date;
  key: string;
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

  const handleDeleteRequest: Function = async (key: string): Promise<void> => {
    try {
      await firebase
        .database()
        .ref(`user/${user.uid}/requests/${key}`)
        .remove();
      await firebase.database().ref(`requests/${key}`).remove();
      alert("Solicitud se ha cancelado existosamente");
    } catch (err) {
      alert(err.message);
    }
  };
  console.log(arrDisplay);

  const display: JSX.Element[] | JSX.Element = arrDisplay.map(
    (r: Request, i: number): JSX.Element => (
      <PaperBG key={i}>
        <Col xs={12} className="p-2">
          <FontAwesomeIcon
            onClick={() => handleDeleteRequest(r.key)}
            icon={faStop}
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
            icon={
              r.solved
                ? faCheckCircle
                : r.cardSended
                ? faPaperPlane
                : r.read
                ? faEye
                : faClock
            }
            style={{
              color: "green",
              position: "absolute",
              top: -30,
              left: -30,
              height: 40,
              width: 40,
            }}
          />
          <Row>
            <Col>
              <p>Fecha de pedido: {formatDate(r.date)}</p>
              <p>Cantidad de tarjetas pedidas: {r.quantity}</p>
              <p>Codigo de Pedido: {r.key}</p>
              <p>Nombre de encuesta: {r.surveyTitle}</p>
              <p>En produccion: {r.starting ? "Si" : "No"}</p>
              <p>Enviado: {r.cardSended ? "Si" : "No"}</p>
              {r.responseComment && <p>{`Comentario: ${r.responseComment}`}</p>}
            </Col>
          </Row>
        </Col>
      </PaperBG>
    )
  );

  return (
    <Container>
      <Col>
        <Row>
          <h5>Estado de solicitudes</h5>
        </Row>

        <Row>
          <Col>{display}</Col>
        </Row>
      </Col>
    </Container>
  );
};

export default RequestStatus;
