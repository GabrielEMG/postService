import React from "react";
import CompanyLogo from "../companyLogo";
import NavbarButton from "./navbarButton";
import { useSelector } from "react-redux";

const Navbar: React.FC = (): JSX.Element => {
  const isLogin = useSelector(
    (selector: any): boolean => selector.user.isLogin
  );

  return (
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
        <NavbarButton link="/about" label="Acerca de nosotros" />
        <NavbarButton link="/prices" label="Precios" />
        <NavbarButton link="/contact_us" label="Contactanos" />
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
