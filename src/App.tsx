import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/home";
import Survey from "./pages/survey";
import Navbar from "./components/navbar";
import User from "./pages/user";
import Admin from "./pages/admin";
import useFirebase from "./hooks/useFirebase";
import Register from "./pages/register/register";

const App = () => {
  useFirebase();
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route exact path="/login">
            <Navbar />
            <Login />
          </Route>
          <Route exact path="/register">
            <Navbar />
            <Register />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/survey/:keyId">
            <Survey />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
