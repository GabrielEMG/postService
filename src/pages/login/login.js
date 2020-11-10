import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setSigninInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignIn = async () => {
    const login = await auth.signInWithEmailAndPassword(
      signinInfo.email,
      signinInfo.password
    );
    dispatch({
      type: "LOGIN_USER",
      payload: login.user.email,
    });
    history.push("/user");
  };

  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e)} name="email" />
      <input type="text" onChange={(e) => handleChange(e)} name="password" />
      <button onClick={() => handleSignIn()}>Login</button>
    </div>
  );
};

export default Login;
