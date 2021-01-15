import React from "react";
import { Route } from "react-router-dom";
import ChartSelector from "./charts";
import CreateSurvey from "./createSurvey";
import EditSurvey from "./editSurvey/editSurvey";
import NavigationButton from "../../components/navigationButton";
import {
  faChartBar,
  faPlusSquare,
  faEdit,
  faSignOutAlt,
  faUser,
  faExclamationTriangle,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import CompanyLogo from "../../components/companyLogo";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FullscreenLoading from "../../components/loadings/FullscreenLoading";
import Profile from "./profile";
import BugReport from "./bugReport";
import Sidebar from "../../components/sidebar";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Request from "./request";

const User: React.FC = (): JSX.Element => {
  const history = useHistory();
  const user = useSelector((selector: any) => selector.user);
  const logout: Function = useLogout();
  const wdim = useWindowDimensions();

  React.useEffect(() => {
    if (!user.isLoading && !user.isLogin) {
      history.push("/login");
    } else if (user.isAdmin) history.push("/admin");
  }, [user.isLoading, user.isLogin, user.isAdmin, history]);

  return (
    <div style={{ display: "flex" }}>
      {user.isLoading || !user.isLogin ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
          }}
        >
          <FullscreenLoading height={100} width={100} />
        </div>
      ) : (
        <>
          <Sidebar>
            <CompanyLogo width={50} height={50} />
            <NavigationButton
              path="/user"
              icon={faChartBar}
              label="Encuestas"
            />
            <NavigationButton
              path="/user/crear-encuesta"
              icon={faPlusSquare}
              label="Crear encuesta"
            />
            <NavigationButton
              path="/user/editar-encuesta"
              icon={faEdit}
              label="Editar encuesta"
            />
            <NavigationButton
              path="/user/perfil"
              icon={faUser}
              label="Usuario"
            />
            <NavigationButton
              path="/user/solicitar"
              icon={faTasks}
              label="Enviar solicitud"
            />
            <NavigationButton
              path="/user/reportar-error"
              icon={faExclamationTriangle}
              label="Reportar un error"
            />
            <NavigationButton
              path="/"
              icon={faSignOutAlt}
              label="Salir"
              action={logout}
            />
          </Sidebar>
          <div
            className="app-colors"
            style={{
              paddingLeft: wdim.width <= 768 ? 0 : 200,
              width: "100%",
              minHeight: "100vh",
            }}
          >
            <Route exact path="/user" children={<ChartSelector />} />
            <Route path="/user/crear-encuesta" children={<CreateSurvey />} />
            <Route path="/user/editar-encuesta" children={<EditSurvey />} />
            <Route path="/user/perfil" children={<Profile />} />
            <Route path="/user/solicitar" children={<Request />} />
            <Route path="/user/reportar-error" children={<BugReport />} />
          </div>
        </>
      )}
    </div>
  );
};

export default User;
