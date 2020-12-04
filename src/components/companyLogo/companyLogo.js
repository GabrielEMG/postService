import logo from "./logo192.png";
import { useHistory } from "react-router-dom";
import { Row } from "react-bootstrap";

const CompanyLogo = (props) => {
  const history = useHistory();
  return (
    <Row className="justify-content-center" onClick={(e) => history.push("/")}>
      <img
        src={logo}
        alt="logo"
        style={{ width: props.width, height: props.height, cursor: "pointer" }}
      />
    </Row>
  );
};

export default CompanyLogo;
