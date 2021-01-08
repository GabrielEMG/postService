import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import "./navigationButton.css";
import { useHistory, useLocation } from "react-router-dom";

type Props = {
  icon: any;
  label: string;
  path: string;
  action?: Function;
};

const NavigationButton: React.FC<Props> = (props): JSX.Element => {
  const history: any = useHistory();
  const location: any = useLocation();

  const isSelected: boolean = props.path === location.pathname;

  const handleClick: Function = (): void => {
    if (props.action) props.action();
    else history.push(props.path);
  };

  return (
    <Row
      onClick={(): void => handleClick()}
      className={`sidebarButton ${isSelected && "isSelected"}`}
    >
      <FontAwesomeIcon icon={props.icon} />
      <p className={`textContainer ${isSelected && "textSelected"}`}>
        {props.label}
      </p>
    </Row>
  );
};

export default NavigationButton;
