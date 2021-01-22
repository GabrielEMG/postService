import { fromUnixTime } from "date-fns";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default (): JSX.Element => {
  return (
    <Container className="app-colors" style={{ minHeight: "100vh" }}>
      <Col>
        <Row className="justify-content-center">
          <h4>Contactame!</h4>
        </Row>
        <Row className="justify-content-center"></Row>
      </Col>
    </Container>
  );
};
