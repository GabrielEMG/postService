import React from "react";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  value: boolean;
};

const BooleanIcons: React.FC<Props> = (props): JSX.Element => {
  return props.value ? (
    <FontAwesomeIcon style={{ justifySelf: "center" }} icon={faCheck} />
  ) : (
    <FontAwesomeIcon
      style={{
        justifyContent: "center",
        height: "100%",
        marginLeft: 6,
        color: "red",
      }}
      icon={faTimes}
    />
  );
};

export default BooleanIcons;
