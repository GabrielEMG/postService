import React from "react";
import { Col } from "react-bootstrap";
import { firebase } from "../../firebase";
import { useDispatch } from "react-redux";

import "./admin.css";
import EditClient from "./editClient";
import Sidebar from "../../components/sidebar";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Admin = (props) => {
  const dispatch = useDispatch();
  const wdim = useWindowDimensions();

  React.useEffect(() => {
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
  }, [dispatch]);

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
