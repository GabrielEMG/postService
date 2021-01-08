import React from "react";
import { Container, Row } from "react-bootstrap";

type Props = {
  message: String;
};

const FullScreenMessage: React.FC<Props> = (props): JSX.Element => {
  return (
    <Container>
      <Row
        style={{
          height: "100vh",
          alignContent: "center",
          justifyContent: "center",
          marginRight: 10,
          marginLeft: 10,
        }}
      >
        <h4>{props.message}</h4>
      </Row>
    </Container>
  );
};

export default FullScreenMessage;
