import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PaperBG from "../../components/paperBG";

const About: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Row>
        <PaperBG style={{ padding: 20 }}>
          <Col>
            <Row className="justify-content-center my-4">
              <h4>Acerca de mi!</h4>
            </Row>
            <Row style={{ textAlign: "center", justifyContent: "center" }}>
              Hola! mi nombre es Gabriel Molina, soy un Software Engineer con
              titulo en Ingenieria Civil Industrial.
            </Row>
            <Row
              className="mt-4 mb-4"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Soy una persona creativa que piensa fuera de la caja y con un
              fuerte background en matematicas. Soy un gran aficionado por la
              automatizacion y la eficiencia de procesos. Tambien me considero
              un team player y una persona muy amigable
            </Row>
            <Row
              className="mt-4"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Estas son las tecnologias que puedo utilizar y me siento cómodo
              trabajando:
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <PaperBG>
                  <Col>
                    <Row className="justify-content-center">Frontend</Row>
                    <ul>
                      <li>React</li>
                      <li>React Native</li>
                      <li>JQuery</li>
                      <li>Typescript*</li>
                    </ul>
                  </Col>
                </PaperBG>
              </Col>
              <Col md={6} xs={12}>
                <PaperBG>
                  <Col>
                    <Row className="justify-content-center">Backend</Row>
                    <ul>
                      <li>NodeJs</li>
                      <li>Firebase</li>
                      <li>Django</li>
                      <li>Flask</li>
                    </ul>
                  </Col>
                </PaperBG>
              </Col>
              <Col md={6} xs={12}>
                <PaperBG>
                  <Col>
                    <Row className="justify-content-center">Base de datos</Row>
                    <ul>
                      <li>
                        NoSQL:
                        <ul>
                          <li>MongoDB</li>
                          <li>Firebase</li>
                        </ul>
                      </li>
                      <li>
                        SQL:
                        <ul>
                          <li>MariaDB</li>
                          <li>SQLite</li>
                        </ul>
                      </li>
                    </ul>
                  </Col>
                </PaperBG>
              </Col>
              <Col md={6} xs={12}>
                <PaperBG>
                  <Col>
                    <Row className="justify-content-center">Extras / Otros</Row>
                    <ul>
                      <li>React con programación funcional (hooks)</li>
                      <li>React REDUX</li>
                      <li>Funciones Lambda</li>
                      <li>Github</li>
                      <li>Docker para microservicios</li>
                      <li>Firebase deploy</li>
                    </ul>
                  </Col>
                </PaperBG>
              </Col>
            </Row>
          </Col>
        </PaperBG>
      </Row>
    </Container>
  );
};

export default About;
