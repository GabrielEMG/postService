import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import "./navigationButton.css";

const NavigationButton = (props) => {
  const { setState, icon, title, globalSection, section } = props;

  return (
    <Row
      onClick={(e) => setState(section)}
      className={`sidebar-button ${globalSection === section && "selected"}`}
    >
      <FontAwesomeIcon icon={icon} />
      <h6 className="text-container">{title}</h6>
      <FontAwesomeIcon icon={faCaretRight} />
    </Row>
  );
};

export default NavigationButton;
