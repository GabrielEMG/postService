import React from "react";
import { useState, useEffect } from "react";
import { firebase } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver";
import {
  Container,
  FormControl,
  Row,
  Button,
  Col,
  InputGroup,
} from "react-bootstrap";

const EditClient = (props) => {
  const admin = useSelector((selector) => selector.admin);
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [survey, setSurvey] = useState("");
  const [addKeys, setAddKeys] = useState(100);
  const [keys, setKeys] = useState([]);

  const handleCreateKeys = async () => {
    const k = new Array(JSON.parse(addKeys)).fill().map(
      () =>
        firebase
          .database()
          .ref("keys/" + user)
          .push().key
    );
    setKeys(k);
  };

  const uploadKeys = async () => {
    try {
      await keys.forEach((key) =>
        firebase
          .database()
          .ref("keys/" + key)
          .set({
            key: key,
            owner: user,
            survey: survey,
            responded: false,
            createdAt: new Date(),
          })
      );
      alert("success");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const x = admin.users.find((u) => u.uid === user);
    if (x) {
      setSurveys(x.surveys);
    }
  }, [admin.users, admin.surveys, user]);

  const handleDownloadQRCodes = () => {
    const qrCodes = document.getElementsByClassName("qr-code");
    Array.from(qrCodes).forEach((code, i) => {
      code.toBlob((blob) => {
        saveAs(blob, `${i}-${survey}.png`);
      });
    });
  };

  return (
    <Container>
      <Col>
        <p>edit client</p>
        <Row>
          <InputGroup className="mt-4">
            <InputGroup.Prepend>
              <InputGroup.Text style={{ width: 100 }}>Cliente</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="select" onChange={(e) => setUser(e.target.value)}>
              <option value="" hidden>
                selecciona un cliente
              </option>
              {admin.users.map((user, id) => (
                <option value={user.uid} key={id}>
                  {user.email}
                </option>
              ))}
            </FormControl>
          </InputGroup>
        </Row>
        {user && (
          <Row>
            <InputGroup className="my-4">
              <InputGroup.Prepend>
                <InputGroup.Text style={{ width: 100 }}>
                  Encuesta
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="select"
                onChange={(e) => setSurvey(e.target.value)}
              >
                <option value="" hidden>
                  selecciona una encuesta
                </option>
                {surveys.map((svy, key) => (
                  <option value={svy.key} key={key}>
                    {svy.title}
                  </option>
                ))}
              </FormControl>
            </InputGroup>
          </Row>
        )}
        {survey !== "" && (
          <Row>
            <InputGroup className="my-4">
              <InputGroup.Prepend>
                <InputGroup.Text style={{ width: 100 }}>
                  Tarjetas
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="number"
                defaultValue={addKeys}
                onChange={(e) => setAddKeys(e.target.value)}
              />
            </InputGroup>
            <Button onClick={() => handleCreateKeys()}>Crear llaves</Button>
          </Row>
        )}
        {keys.length > 0 && (
          <Row className="justify-content-center">
            {keys.map((key, id) => (
              <Col key={key} className="m-4">
                <Row>
                  <QRCode
                    className="qr-code"
                    value={`http://192.168.43.37:3000/survey/${key}`}
                  />
                </Row>
              </Col>
            ))}
          </Row>
        )}
        {
          <Row className="justify-content-center mt-4">
            <Button onClick={(e) => uploadKeys()}>Subir llaves</Button>
            <Button onClick={(e) => handleDownloadQRCodes()}>
              Descargar códigos
            </Button>
          </Row>
        }
      </Col>
    </Container>
  );
};

export default EditClient;
