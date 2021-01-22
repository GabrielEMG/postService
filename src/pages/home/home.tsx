import React from "react";
import { auth } from "../../firebase";
import { Container, Col, Row } from "react-bootstrap";

const Home: React.FC = (): JSX.Element => {
  return (
    <Container>
      <h1>This is home :D</h1>
    </Container>
  );
};

export default Home;
