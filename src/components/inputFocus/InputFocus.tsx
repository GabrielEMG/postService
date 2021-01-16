import React from "react";

type Props = {
  fontSize?: number;
  value: string;
  action: Function;
};

const InputFocus: React.FC<Props> = (props): JSX.Element => {
  const [state, setState] = React.useState({
    onFocus: false,
    value: props.value,
    newValue: props.value,
  });
  const inputRef: any = React.useRef();

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
    props.action(state.newValue);
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
      {state.onFocus ? (
        <input
          className="inputchange app-colors"
          ref={inputRef}
          value={state.newValue}
          onChange={(e) => handleChange(e)}
          type="text"
          onBlur={() => handleBlur()}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      ) : (
        <p
          onClick={() => handleClick()}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            paddingTop: 20,
            paddingLeft: 1,
            fontSize: props.fontSize ? props.fontSize : 16,
          }}
        >
          {props.value ? props.value : "Agregar información"}
        </p>
      )}
    </div>
  );
};

export default InputFocus;
