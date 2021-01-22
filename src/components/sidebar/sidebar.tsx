import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  style?: React.CSSProperties;
  children: any;
  colapseWidth?: number;
};

const Sidebar: React.FC<Props> = (props): JSX.Element => {
  const [colapse, setColapse] = React.useState<boolean>(true);
  const [actived, setActived] = React.useState<boolean>(false);
  const wdim = useWindowDimensions();
  const wc = props.colapseWidth ? props.colapseWidth : 768;
  React.useEffect(() => {
    if (wdim.width <= wc && !colapse) {
      setColapse(true);
    } else if (wdim.width > wc && colapse) {
      setColapse(false);
    }
  }, [wdim.width]);

  const ActivateButton: any = () => {
    return (
      !actived &&
      colapse && (
        <div
          onClick={() => setActived(true)}
          style={{
            cursor: "pointer",
            position: "fixed",
            width: 50,
            height: 50,
            left: 20,
            top: 20,
            zIndex: 2,
            borderRadius: 10,
            borderColor: "purple",
            boxShadow: "2px 4px 8px 1px rgba(0,0,0,0.2)",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: "#f3f3f3",
          }}
        >
          <FontAwesomeIcon icon={faBars} width={15} height={15} />
        </div>
      )
    );
  };

  return (
    <>
      <ActivateButton />

      {colapse ? (
        <>
          <div
            onClick={() => setActived(false)}
            style={{
              position: "fixed",
              flex: 1,
              left: 0,
              bottom: 0,
              zIndex: 3,
              minHeight: "100vh",
              width: "100%",
              backgroundColor: `rgba(0,0,0,0.4)`,
              transform: `translateX(${actived ? 0 : "-100%"})`,
              transition: "all 200ms",
            }}
            onScroll={() => setActived(false)}
          />
          <div
            className="app-dark"
            style={{
              width: 200,
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              zIndex: 4,
              transform: `translateX(${actived ? "0" : "-200px"})`,
              transition: "all 200ms",
              paddingTop: 20,
              overflowY: "scroll",
            }}
          >
            {props.children}
          </div>
        </>
      ) : (
        <div
          className="app-dark"
          style={{
            width: 200,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: 4,
            paddingTop: 20,
          }}
        >
          {props.children}
        </div>
      )}
    </>
  );
};

export default Sidebar;
