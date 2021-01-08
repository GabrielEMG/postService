import { auth } from "../firebase";
import { useDispatch } from "react-redux";

const useLogout: Function = (): Function => {
  const dispatch: any = useDispatch();
  const logoutUser: Function = (): void => {
    auth.signOut();
    dispatch({
      type: "LOGOUT_USER",
    });
  };
  return logoutUser;
};

export default useLogout;
