import Sidebar from "../../components/sidebar";
import NavigationButton from "../../components/navigationButton";
import CompanyLogo from "../../components/companyLogo";
import useLogout from "../../hooks/useLogout";
import { Row, Col } from "react-bootstrap";
import {
  faChartBar,
  faPlusSquare,
  faEdit,
  faSignOutAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

const UserSidebar = (props) => {
  const logoutUser = useLogout();
  const { section, setSection } = props;
  return (
    <Sidebar width={150} style={{ color: "#3C1874" }}>
      <CompanyLogo
        height={50}
        width={50}
        style={{
          marginTop: 20,
        }}
      />

      <NavigationButton
        setState={setSection}
        icon={faChartBar}
        title="Encuestas"
        globalSection={section}
        section="data"
      />
      <NavigationButton
        setState={setSection}
        icon={faPlusSquare}
        title="Crear encuesta"
        globalSection={section}
        section="createSurvey"
      />
      <NavigationButton
        setState={setSection}
        icon={faEdit}
        title="Editar encuestas"
        globalSection={section}
        section="editSurvey"
      />
      <NavigationButton
        setState={setSection}
        icon={faUserEdit}
        title="Cuenta"
        globalSection={section}
        section="adminAccount"
      />

      <Row onClick={(e) => logoutUser()}>
        <Col>
          <NavigationButton
            setState={setSection}
            icon={faSignOutAlt}
            title="Salir"
            globalSection={section}
            section="Logout"
          />
        </Col>
      </Row>
    </Sidebar>
  );
};

export default UserSidebar;
