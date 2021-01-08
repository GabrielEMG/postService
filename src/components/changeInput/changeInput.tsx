import React from "react";

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
    <div>
      <p>{props.title}</p>
      {state.onFocus ? (
        <input
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
          style={{ cursor: "pointer" }}
        >
          {props.value
            ? props.value
            : props.canChange
            ? "Agregar información"
            : "null"}
        </p>
      )}
    </div>
  );
};

export default ChangeInput;
