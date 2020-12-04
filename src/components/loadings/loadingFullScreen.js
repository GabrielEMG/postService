import { Container, Row } from "react-bootstrap";
import Loader from "react-loader-spinner";

const LoadingFullScreen = () => {
  return (
    <Container>
      <Row
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader type="Circles" color="#00BFFF" height={150} width={150} />
      </Row>
    </Container>
  );
};

export default LoadingFullScreen;
