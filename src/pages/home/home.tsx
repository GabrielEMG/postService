import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import img4 from "./img4.png";
import img5 from "./img5.png";
import PaperBG from "../../components/paperBG";

const Home: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Row className="justify-content-center py-4">
        <h4>Bienvenido a mi app!</h4>
      </Row>
      <Row>
        <Col>
          <Row
            className="justify-content-center mb-4"
            style={{ textAlign: "center" }}
          >
            Esta app es un portal de encuestas enfocada a empresas que desean
            realizar un estudio de mercado y saber la opinion de sus clientes de
            forma precisa y en tiempo real
          </Row>
          <Row className="justify-content-center">
            <PaperBG>
              <Row className="justify-content-center py-3">
                <h4>TESTEA MI APP!!</h4>
              </Row>
              <Row className="justify-content-center">
                <Col xs={10} md={6} lg={6}>
                  <PaperBG>
                    <Col>
                      <Row className="justify-content-center">
                        <h5
                          style={{
                            borderBottom: "solid",
                            borderWidth: "thin",
                            textAlign: "center",
                            paddingBottom: 20,
                          }}
                        >
                          Ingresa a la app con el usuario de prueba
                        </h5>
                      </Row>
                      <img
                        src={img5}
                        style={{
                          width: "100%",
                          border: "solid",
                          borderWidth: "thin",
                        }}
                      />
                    </Col>
                  </PaperBG>
                </Col>
                <Col xs={10} md={6} lg={6}>
                  <PaperBG>
                    <Col>
                      <Row className="justify-content-center">
                        <h5
                          style={{
                            borderBottom: "solid",
                            borderWidth: "thin",
                            textAlign: "center",
                            paddingBottom: 20,
                          }}
                        >
                          Selecciona la encuesta de prueba, crea un codigo qr y
                          escanealo con tu celular
                        </h5>
                      </Row>
                      <img
                        src={img3}
                        style={{
                          width: "100%",
                          border: "solid",
                          borderWidth: "thin",
                        }}
                      />
                    </Col>
                  </PaperBG>
                </Col>
                <Col xs={10} md={6} lg={6}>
                  <PaperBG>
                    <Col>
                      <Row className="justify-content-center">
                        <h5
                          style={{
                            borderBottom: "solid",
                            borderWidth: "thin",
                            textAlign: "center",
                            paddingBottom: 20,
                          }}
                        >
                          Completa la encuesta y enviala al finalizar
                        </h5>
                      </Row>
                      <img
                        src={img4}
                        style={{
                          width: "50%",
                          borderRight: "solid",
                          borderWidth: "thin",
                        }}
                      />
                      <img
                        src={img2}
                        style={{
                          width: "50%",
                          borderWidth: "thin",
                        }}
                      />
                    </Col>
                  </PaperBG>
                </Col>
                <Col xs={10} md={6} lg={6}>
                  <PaperBG>
                    <Col>
                      <Row className="justify-content-center">
                        <h5
                          style={{
                            borderBottom: "solid",
                            borderWidth: "thin",
                            textAlign: "center",
                            paddingBottom: 20,
                          }}
                        >
                          Observa como responden en tiempo real los graficos
                          luego de enviar tu respuesta
                        </h5>
                      </Row>
                      <img
                        src={img1}
                        style={{
                          width: "100%",
                          border: "solid",
                          borderWidth: "thin",
                        }}
                      />
                    </Col>
                  </PaperBG>
                </Col>
              </Row>
            </PaperBG>
          </Row>

          <Row>
            <PaperBG>
              <Row className="justify-content-center py-3">
                <h4>CÓMO FUNCIONA</h4>
              </Row>
              <Row className="justify-content-center">
                <Col xs={6} md={3} style={{ height: 300 }}>
                  <PaperBG style={{ height: "90%" }}>
                    <Col>
                      1. Crea una encuesta con la informacion que necesites
                      saber de tus clientes
                    </Col>
                  </PaperBG>
                </Col>
                <Col xs={6} md={3} style={{ height: 300 }}>
                  <PaperBG style={{ height: "90%" }}>
                    <Col>
                      2. Solicita tarjetas con claves unicas (Codigo QR)
                    </Col>
                  </PaperBG>
                </Col>
                <Col xs={6} md={3} style={{ height: 300 }}>
                  <PaperBG style={{ height: "90%" }}>
                    <Col>
                      3. por cada venta o despacho que hagas entrega una tarjeta
                      al cliente para que respondan la encuesta
                    </Col>
                  </PaperBG>
                </Col>
                <Col xs={6} md={3} style={{ height: 300 }}>
                  <PaperBG style={{ height: "90%" }}>
                    <Col>
                      4. observa en las respuestas de tus clientes en tiempo
                      real para disenar y administrar tu empresa en base a la
                      opinion de tus clientes
                    </Col>
                  </PaperBG>
                </Col>
              </Row>
            </PaperBG>
          </Row>
          <Row>
            <PaperBG>
              <Col>
                <Row>
                  <h5>Esta aplicacion fue creada con:</h5>
                </Row>
                <ul>
                  <li>React</li>
                  <li>Redux</li>
                  <li>Typescript</li>
                  <li>Firebase (NoSQL)</li>
                  <li>Bootstrap</li>
                  <li>Chartjs</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>Github</li>
                </ul>
              </Col>
            </PaperBG>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
