import { auth } from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLoginData from "./useLoginData";

const usePersistLogin = (props) => {
  useLoginData();
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        dispatch({
          type: "LOGIN_USER",
          payload: user.email,
        });
      } else if (user === null) {
        dispatch({
          type: "END_LOADING",
        });
      }
    });
  }, []);
};

export default usePersistLogin;
