import { Container, Row } from "react-bootstrap";

const FullScreenMessage = (props) => {
  return (
    <Container>
      <Row
        style={{
          height: "100vh",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h6 style={{ backgroundColor: "white" }}>{props.message}</h6>
      </Row>
    </Container>
  );
};

export default FullScreenMessage;
