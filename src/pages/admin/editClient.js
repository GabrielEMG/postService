import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
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
  const [client, setClient] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [survey, setSurvey] = useState("");
  const [addKeys, setAddKeys] = useState(100);
  const [allowDownload, setAllowDownload] = useState(false);
  const dispatch = useDispatch();

  const handleCreateKeys = async () => {
    const keys = new Array(JSON.parse(addKeys))
      .fill()
      .map(() => db.collection("key").doc());
    console.log(keys);
    console.log("trigger keys");
  };

  useEffect(() => {
    setSurveys([]);
    if (client !== null) {
      db.collection("survey")
        .where("owner", "==", client)
        .get()
        .then((data) => {
          const surveys = data.docs.map((doc) => {
            return { title: doc.data().title, id: doc.id };
          });
          setSurveys(surveys);
        });
    }
  }, [client]);

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
            <FormControl
              as="select"
              onChange={(e) => setClient(e.target.value)}
            >
              <option value="" hidden>
                selecciona un cliente
              </option>
              {admin.clients.map((client, id) => (
                <option value={client} key={id}>
                  {client}
                </option>
              ))}
            </FormControl>
          </InputGroup>
        </Row>
        {client && (
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
                  <option value={svy.id} key={key}>
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
        {admin.keys.length > 0 && (
          <Row className="justify-content-center">
            {admin.keys.map((key, id) => (
              <Col key={key} className="m-4">
                <Row>
                  <QRCode
                    className="qr-code"
                    value={`http://192.168.43.37:3000/survey/${key.survey}/${key.key}`}
                  />
                </Row>
              </Col>
            ))}
          </Row>
        )}
        {allowDownload && (
          <Row className="justify-content-center mt-4">
            <Button onClick={(e) => handleDownloadQRCodes()}>
              Descargar códigos
            </Button>
          </Row>
        )}
      </Col>
    </Container>
  );
};

export default EditClient;
