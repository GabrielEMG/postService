import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Prices: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-center my-4">
            <h4>Precios</h4>
          </Row>
          <Row className="justify-content-center">
            Este es un proyecto para crear una startup. Aun no he planteado bien
            el modelo de negocios para la empresa, pero estoy en eso LOL.
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Prices;
