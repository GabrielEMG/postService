import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { auth, firebase } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import "./admin.css";
import EditClient from "./editClient";
import Sidebar from "../../components/sidebar";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Admin = (props) => {
  const admin = useSelector((selector) => selector.admin);
  const [section, setSection] = useState("data");
  const history = useHistory();
  const dispatch = useDispatch();
  const wdim = useWindowDimensions();

  useEffect(() => {
    firebase
      .database()
      .ref("user")
      .on("value", (snapshot) => {
        snapshot.forEach((childSnap) => {
          dispatch({
            type: "ADMIN_GET_USERS",
            payload: childSnap.val(),
          });
        });
      });
  }, []);

  return (
    <div
      className="app-colors"
      style={{
        display: "inline-flex",
        width: "100%",
      }}
    >
      <div style={{ width: 150 }}>
        <Sidebar />
      </div>
      <div
        style={{
          width: wdim.width - 150,
        }}
      >
        <Col
          style={{ height: "100%", padding: 0, margin: 0 }}
          md={10}
          className="overflow-auto"
        >
          <EditClient />
        </Col>
      </div>
    </div>
  );
};

export default Admin;
