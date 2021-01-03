import { Container, Row } from "react-bootstrap";

const FullScreenMessage = (props) => {
  return (
    <Container>
      <Row
        style={{
          height: "100vh",
          alignContent: "center",
          justifyContent: "center",
          maringRight: 10,
          marginLeft: 10,
        }}
      >
        <h4>{props.message}</h4>
      </Row>
    </Container>
  );
};

export default FullScreenMessage;
