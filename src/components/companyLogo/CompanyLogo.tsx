import React from "react";
import logo from "./logo192.png";
import { useHistory, useLocation } from "react-router-dom";

type Props = {
  width: number;
  height: number;
  style?: React.CSSProperties;
};

const CompanyLogo: React.FC<Props> = (props): JSX.Element => {
  const history: any = useHistory();
  const location: any = useLocation();

  const redirect: Function = (): void => {
    const url = location.pathname.includes("user") ? "/user" : "/";
    history.push(url);
  };

  return (
    <div
      style={{
        position: "relative",
        justifyContent: "center",
        display: "flex",
      }}
      onClick={(): void => redirect()}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: props.width,
          height: props.height,
          cursor: "pointer",
          ...props.style,
        }}
      />
    </div>
  );
};

export default CompanyLogo;
