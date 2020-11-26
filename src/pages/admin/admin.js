import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { auth, db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { faSignOutAlt, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import "./admin.css";
import EditClient from "./editClient";

const Admin = (props) => {
  const user = useSelector((selector) => selector.user);
  const admin = useSelector((selector) => selector.admin);
  const [section, setSection] = useState("data");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("Admin-data")
      .get()
      .then((data) => {
        const doc = data.docs[0].data();
        dispatch({ type: "LOAD_CLIENTS", payload: doc.users });
      });
  }, []);

  return (
    <Container fluid>
      <Row style={{ height: "100vh" }}>
        <Col lg={2} style={{ backgroundColor: "rgba(150,150,150,0.2)" }}>
          <Row onClick={() => history.push("/")}>LogoEmpresa</Row>

          <Row>{user.email}</Row>

          <Row onClick={(e) => auth.signOut()} className="sidebar-button">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <h6 className="text-container">Salir</h6>
            <FontAwesomeIcon icon={faCaretRight} />
          </Row>
        </Col>
        <Col
          style={{ height: "100%", padding: 0, margin: 0 }}
          md={10}
          className="overflow-auto"
        >
          <EditClient />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
