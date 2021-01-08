import React from "react";
import Loader from "react-loader-spinner";
import { Button } from "react-bootstrap";

type Props = {
  condition: boolean;
  isDisabled?: boolean;
  action: Function;
  label: string;
};

const ButtonWithLoad: React.FC<Props> = (props): JSX.Element => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {props.condition ? (
        <Loader type="TailSpin" color="#3C1874" width="100" height="50" />
      ) : (
        <Button
          disabled={props.isDisabled || false}
          style={{
            borderRadius: 10,
            width: "100%",
            height: 50,
            backgroundColor: "#3C1874",
            borderColor: "rgba(0,0,0,0)",
          }}
          size="sm"
          onClick={() => {
            props.action();
          }}
        >
          {props.label}
        </Button>
      )}
    </div>
  );
};

export default ButtonWithLoad;
