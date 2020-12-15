import { Col } from "react-bootstrap";

const Sidebar = (props) => {
  return (
    <Col
      lg={2}
      style={{
        height: "100vh",
        left: 0,
        top: 0,
        backgroundColor: "rgba(50,200,100,0.3)",
      }}
    >
      {props.children}
    </Col>
  );
};

export default Sidebar;
