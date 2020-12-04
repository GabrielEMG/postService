import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const user = useSelector((selector) => selector.user);
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useState({
    isLoading: false,
    error: "",
  });

  useEffect(() => {
    if (user.email !== null && !user.loading) history.push("/user");
    else console.log("debes loguear >:D");
  }, [user.email, user.loading]);

  const handleSignIn = async (email, password) => {
    try {
      dispatch({ type: "START_LOADING" });
      setState((prev) => {
        return { ...prev, isLoading: true };
      });
      await auth.signInWithEmailAndPassword(email, password);
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
      dispatch({
        type: "LOGIN_USER",
        payload: email,
      });
    } catch (err) {
      setState((prev) => {
        return { ...prev, error: err.message, isLoading: false };
      });
    }
  };

  return [state, handleSignIn];
};

export default useLogin;
