import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import CreateSurvey from "./pages/clientSurvey/createSurvey";
import Survey from "./pages/userSurvey/survey";

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/">home</Link>
      <Link to="/login">login</Link>
      <Link to="/user">user</Link>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/user">
          <CreateSurvey />
        </Route>
        <Route path="/survey/:id">
          <Survey />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
