import React from "react";

type Props = {
  children: JSX.Element;
  style?: React.CSSProperties;
};

const PaperBG: React.FC<Props> = (props): JSX.Element => {
  return (
    <div
      className="app-colors"
      style={{
        position: "relative",
        boxShadow: `2px 4px 8px 1px rgba(0,0,0,0.2)`,
        borderRadius: 10,
        padding: 10,
        width: "100%",
        marginTop: 10,
        marginBottom: 10,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default PaperBG;
