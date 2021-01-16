import React from "react";
import { Route } from "react-router-dom";
import NavigationButton from "../../components/navigationButton";
import {
  faSignOutAlt,
  faBug,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import CompanyLogo from "../../components/companyLogo";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FullscreenLoading from "../../components/loadings/FullscreenLoading";
import Sidebar from "../../components/sidebar";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import EditUser from "./editUser";
import AdminPanel from "./adminPanel";
import BugReports from "./bugReports";

const User: React.FC = (): JSX.Element => {
  const history = useHistory();
  const user = useSelector((selector: any) => selector.user);
  const logout: Function = useLogout();
  const wdim = useWindowDimensions();

  React.useEffect(() => {
    if (!user.isLoading && !user.isLogin) {
      history.push("/login");
    } else if (!user.isAdmin) {
      history.push("/user");
    }
  }, [user.isLoading, user.isLogin, history, user.isAdmin]);

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
              path="/admin"
              icon={faIdCard}
              label="Crear tarjetas"
            />
            <NavigationButton
              path="/admin/bug_reports"
              icon={faBug}
              label="Bugs reportados"
            />
            <NavigationButton
              path="/admin/editar_usuario"
              icon={faSignOutAlt}
              label="Editar usuarios"
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
            <Route exact path="/admin" children={<AdminPanel />} />
            <Route exact path="/admin/bug_reports" children={<BugReports />} />
            <Route exact path="/admin/editar_usuario" children={<EditUser />} />
          </div>
        </>
      )}
    </div>
  );
};

export default User;
