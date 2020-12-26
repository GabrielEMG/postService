import logo from "./logo192.png";
import { useHistory } from "react-router-dom";

const CompanyLogo = (props) => {
  const history = useHistory();
  return (
    <div
      style={{
        position: "relative",
        justifyContent: "center",
        display: "flex",
      }}
      onClick={(e) => history.push("/")}
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
