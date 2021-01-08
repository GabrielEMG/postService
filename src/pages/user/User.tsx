import React from "react";
import { Switch, Route } from "react-router-dom";
import ChartSelector from "./charts";
import CreateSurvey from "./createSurvey";
import EditSurvey from "./editSurvey/editSurvey";
import NavigationButton from "../../components/navigationButton";
import {
  faChartBar,
  faPlusSquare,
  faEdit,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import CompanyLogo from "../../components/companyLogo";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FullscreenLoading from "../../components/loadings/FullscreenLoading";
import Profile from "./profile";

const User: React.FC = (): JSX.Element => {
  const history = useHistory();
  const user = useSelector((selector: any) => selector.user);
  const logout: Function = useLogout();

  React.useEffect(() => {
    if (!user.isLoading && !user.isLogin) {
      history.push("/login");
    }
  }, [user.isLoading, user.isLogin, history]);

  return (
    <div style={{ display: "flex" }}>
      {user.isLoading || !user.isLogin ? (
        <div style={{ width: "100%", height: "100vh" }}>
          <FullscreenLoading height={100} width={100} />
        </div>
      ) : (
        <>
          <div
            className="app-dark"
            style={{
              width: 200,
              position: "sticky",
              top: 0,
              left: 0,
              height: "100vh",
            }}
          >
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
              icon={faEdit}
              label="Usuario"
            />
            <NavigationButton
              path="/"
              icon={faSignOutAlt}
              label="Salir"
              action={logout}
            />
          </div>
          <Switch>
            <div
              className="app-colors"
              style={{ display: "flex", width: "100%" }}
            >
              <Route exact path="/user" children={<ChartSelector />} />
              <Route path="/user/crear-encuesta" children={<CreateSurvey />} />
              <Route path="/user/editar-encuesta" children={<EditSurvey />} />
              <Route path="/user/perfil" children={<Profile />} />
            </div>
          </Switch>
        </>
      )}
    </div>
  );
};

export default User;
