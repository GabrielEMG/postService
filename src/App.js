import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import RecoverPassword from "./pages/login/recoverPassword";
import Home from "./pages/home/home";
import Survey from "./pages/survey/survey";
import MyNavbar from "./components/myNavbar";
import UserLandingPage from "./pages/user/landingPage";
import Admin from "./pages/admin";
import usePersistLogin from "./hooks/usePersistLogin";
import useLoginData from "./hooks/useLoginData";

const App = () => {
  usePersistLogin();
  useLoginData();

  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/recuperar_contraseña">
            <RecoverPassword />
          </Route>
          <Route path="/user">
            <UserLandingPage />
          </Route>
          <Route path="/survey/:id/:key">
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
