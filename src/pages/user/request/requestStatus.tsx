import React from "react";
import { firebase } from "../../../firebase";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaperBG from "../../../components/paperBG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateFormat } from "../../../helpers/dateFormat";
import {
  faCheckDouble,
  faCheck,
  faPaperPlane,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import BooleanIcons from "../../../components/booleanIcons";

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
  ready: boolean;
  paid: boolean;
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

  const display: JSX.Element[] | JSX.Element = arrDisplay.map(
    (r: Request, i: number): JSX.Element => (
      <PaperBG
        key={i}
        style={{
          backgroundColor: r.cardSended
            ? "rgba(0,255,0,0.5)"
            : r.ready
            ? "rgba(0,255,0,0.3)"
            : r.starting
            ? "rgba(0,255,0,0.1)"
            : "rgba(0,200,0,0.1)",
        }}
      >
        <Col xs={12} className="p-2">
          {!r.starting && (
            <FontAwesomeIcon
              onClick={() => handleDeleteRequest(r.key)}
              icon={faTimesCircle}
              style={{
                cursor: "pointer",
                height: 30,
                width: 30,
                position: "absolute",
                top: -20,
                right: -20,
                color: "red",
              }}
            />
          )}
          <FontAwesomeIcon
            icon={
              r.cardSended
                ? faPaperPlane
                : r.ready
                ? faCheckDouble
                : r.starting
                ? faCheck
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
            <Col className="ml-3">
              <Row>Fecha de pedido: {dateFormat(new Date(r.date))}</Row>
              <Row>Cantidad de tarjetas pedidas: {r.quantity}</Row>
              <Row>Codigo de Pedido: {r.key}</Row>
              <Row>Nombre de encuesta: {r.surveyTitle}</Row>
              <Row>
                Pagado: <BooleanIcons value={r.paid} />
              </Row>
              <Row className="align-items-center">
                En produccion: <BooleanIcons value={r.starting} />
              </Row>
              <Row className="align-items-center">
                Listo para envio: <BooleanIcons value={r.ready} />
              </Row>
              <Row className="align-items-center">
                Enviado: <BooleanIcons value={r.cardSended} />
              </Row>
              {r.responseComment && (
                <Row>{`Comentario: ${r.responseComment}`}</Row>
              )}
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
