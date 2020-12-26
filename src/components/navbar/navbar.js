import CompanyLogo from "../companyLogo";
import NavbarButton from "./navbarButton";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((selector) => selector.user);

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
        {user.isLogin ? (
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
