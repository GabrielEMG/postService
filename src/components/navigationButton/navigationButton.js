import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import "./navigationButton.css";

const NavigationButton = (props) => {
  const { setState, icon, title, globalSection, section } = props;

  return (
    <Row
      onClick={(e) => setState(section)}
      className={`sidebarButton ${globalSection === section && "isSelected"}`}
    >
      <FontAwesomeIcon icon={icon} />
      <p
        className={`textContainer ${
          globalSection === section && "textSelected"
        }`}
      >
        {title}
      </p>
    </Row>
  );
};

export default NavigationButton;
