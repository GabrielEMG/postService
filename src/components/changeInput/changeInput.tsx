import React from "react";
import { Col, Row } from "react-bootstrap";
import PaperBG from "../paperBG";
import "./changeInput.css";

type Props = {
  title: string;
  value: string;
  name: string;
  action: Function;
  canChange: boolean;
};

type State = {
  onFocus: boolean;
  value: string;
  newValue: string;
  activateBlurAction: boolean;
};

const ChangeInput: React.FC<Props> = (props): JSX.Element => {
  const [state, setState] = React.useState<State>({
    onFocus: false,
    activateBlurAction: true,
    value: props.value,
    newValue: props.value,
  });

  const inputRef: any = React.useRef();

  React.useEffect(() => {
    setState((prev) => ({
      ...prev,
      value: props.value,
      newValue: props.value,
    }));
  }, [props.value]);

  React.useEffect(() => {
    state.onFocus && inputRef.current.focus();
  }, [state.onFocus]);

  const handleChange: Function = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setState((prev) => ({ ...prev, newValue: e.target.value }));
  };

  const handleClick: Function = (): void => {
    setState((prev) => ({ ...prev, onFocus: true }));
  };

  const successChange: Function = (): void => {
    props.action(props.name, state.newValue);
    setState((prev) => ({ ...prev, onFocus: false }));
  };

  const handleKeyDown: Function = (e: any): void => {
    if (e.key === "Enter") {
      successChange();
    } else if (e.key === "Escape") {
      setState((prev) => ({ ...prev, onFocus: false, newValue: prev.value }));
    }
  };

  const handleBlur: Function = (): void => {
    successChange();
  };

  return (
    <Col xs={12} sm={6} md={6} lg={4} xl={3}>
      <PaperBG>
        <Col>
          {props.canChange && (
            <div onClick={() => handleClick()} className="editbutton">
              <p>editar</p>
            </div>
          )}
          <Row style={{ marginTop: 5, marginBottom: 5 }}>
            <h6>{props.title}</h6>
          </Row>
          <Row
            style={{
              width: "100%",
              height: 60,
            }}
          >
            {state.onFocus ? (
              <input
                className="inputchange app-colors"
                ref={inputRef}
                value={state.newValue}
                onChange={(e) => handleChange(e)}
                name={props.name}
                type="text"
                onBlur={() => handleBlur()}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            ) : (
              <p
                onClick={() => props.canChange && handleClick()}
                style={{
                  cursor: props.canChange ? "pointer" : "auto",
                  width: "100%",
                  height: "100%",
                  paddingTop: 20,
                  paddingLeft: 1,
                }}
              >
                {props.value
                  ? props.value
                  : props.canChange
                  ? "Agregar información"
                  : "null"}
              </p>
            )}
          </Row>
        </Col>
      </PaperBG>
    </Col>
  );
};

export default ChangeInput;
