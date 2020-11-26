import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import RecoverPassword from "./pages/login/recoverPassword";
import Home from "./pages/home/home";
import Survey from "./pages/survey/survey";
import MyNavbar from "./components/myNavbar";
import UserLandingPage from "./pages/user/landingPage";
import { auth, db } from "./firebase";
import { useDispatch } from "react-redux";
import Admin from "./pages/admin";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user !== null && user.email !== null) {
        dispatch({
          type: "LOGIN_USER",
          payload: user.email,
        });
        await db
          .collection("survey")
          .where("owner", "==", user.email)
          .get()
          .then((data) => {
            const surveys = data.docs.map((doc) => doc.data());
            dispatch({
              type: "SET_SURVEYS",
              payload: surveys,
            });
          })
          .catch((err) => {
            console.log(err.message);
            dispatch({ type: "END_LOADING" });
          });
        await db
          .collection("survey-responses")
          .where("owner", "==", user.email)
          .get()
          .then((data) => {
            const responses = data.docs.map((doc) => doc.data());
            dispatch({
              type: "SET_DATA",
              payload: responses,
            });
          })
          .catch((err) => {
            console.log(err.message);
            dispatch({ type: "END_LOADING" });
          });
      } else {
        dispatch({ type: "LOGOUT_USER" });
      }
      dispatch({ type: "END_LOADING" });
    });
  }, []);

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
