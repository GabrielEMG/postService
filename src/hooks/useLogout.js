import { auth } from "../firebase";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT_USER",
    });
  };
  return logoutUser;
};

export default useLogout;
