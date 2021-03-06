import React from "react";
import CompanyLogo from "../companyLogo";
import NavbarButton from "./navbarButton";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Sidebar from "../sidebar";
import NavigationButton from "../navigationButton";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserAlt,
  faHome,
  faMailBulk,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import useLogout from "../../hooks/useLogout";

const Navbar: React.FC = (): JSX.Element => {
  const isLogin = useSelector(
    (selector: any): boolean => selector.user.isLogin
  );
  const logout: Function = useLogout();
  const wdim = useWindowDimensions();

  const navbarBreak = 980;

  const colapsedNavbar = () => (
    <Sidebar colapseWidth={navbarBreak}>
      <NavigationButton path="/" icon={faHome} label="Hogar" />
      <NavigationButton
        path="/contact_us"
        icon={faMailBulk}
        label="Contactame!"
      />
      <NavigationButton path="/about" icon={faInfo} label="Acerca de mi" />
      {isLogin ? (
        <>
          <NavigationButton path="/user" icon={faUserAlt} label="Ingresar" />
          <NavigationButton
            path="/login"
            icon={faSignOutAlt}
            label="Salir"
            action={logout}
          />
        </>
      ) : (
        <>
          <NavigationButton path="/login" icon={faUserAlt} label="Login" />
          <NavigationButton
            path="/register"
            icon={faSignInAlt}
            label="Registrarse"
          />
        </>
      )}
    </Sidebar>
  );

  return wdim.width <= navbarBreak ? (
    colapsedNavbar()
  ) : (
    <div
      style={{
        position: "relative",
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: 70,
        padding: 10,
        alignItems: "center",
      }}
    >
      <CompanyLogo
        height={50}
        width={50}
        style={{ marginRight: 20, marginLeft: 20 }}
      />
      <div style={{ position: "relative", display: "inline-flex" }}>
        <NavbarButton link="/" label="Hogar" />
        <NavbarButton link="/about" label="Acerca de mi!" />
        <NavbarButton link="/contact_us" label="Contactame!" />
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          flexGrow: 1,
          paddingRight: 20,
        }}
      >
        {isLogin ? (
          <NavbarButton link="/user" label="Ingresar" />
        ) : (
          <>
            <NavbarButton link="/register" label="Registrarse" />
            <NavbarButton link="/login" label="Iniciar sesion" />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
