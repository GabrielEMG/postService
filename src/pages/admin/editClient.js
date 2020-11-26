import React from "react";
import { useState, useEffect } from "react";
import { Container, FormControl, Row, Button, Col } from "react-bootstrap";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode.react";

const EditClient = (props) => {
  const admin = useSelector((selector) => selector.admin);
  const [client, setClient] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [survey, setSurvey] = useState({});
  const [addKeys, setAddKeys] = useState(100);
  const dispatch = useDispatch();

  const handleCreateKeys = () => {
    new Array(JSON.parse(addKeys)).fill().forEach((e) =>
      db
        .collection("survey-keys")
        .add({
          client: client,
          responded: false,
          survey: survey,
          date: new Date(),
        })
        .then((doc) =>
          dispatch({
            type: "ADD_KEY",
            payload: { key: doc.id, email: client, survey: survey },
          })
        )
    );
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

  return (
    <Container>
      <p>edit client</p>
      <FormControl as="select" onChange={(e) => setClient(e.target.value)}>
        <option value="" hidden>
          selecciona un cliente
        </option>
        {admin.clients.map((client, id) => (
          <option value={client} key={id}>
            {client}
          </option>
        ))}
      </FormControl>
      <FormControl as="select" onChange={(e) => setSurvey(e.target.value)}>
        <option value="" hidden>
          selecciona una encuesta
        </option>
        {surveys.map((survey, key) => (
          <option value={survey.id} key={key}>
            {survey.title}
          </option>
        ))}
      </FormControl>

      <Row>
        <h5>cantidad de targetas</h5>
        <FormControl
          type="number"
          defaultValue={addKeys}
          onChange={(e) => setAddKeys(e.target.value)}
        />
        <p>{addKeys}</p>
        <Button onClick={() => handleCreateKeys()}>Crear llaves</Button>
      </Row>
      <Row>
        {admin.keys.map((key, id) => (
          <Col key={key} className="m-4">
            <Row>
              <QRCode
                value={`http://192.168.43.37:3000/survey/${key.survey}/${key.key}`}
              />
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EditClient;
