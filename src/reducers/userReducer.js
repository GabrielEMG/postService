import { auth } from "../firebase";

const initialState = {
  email: "",
  id: "",
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      return { ...state, email: payload };
    case "LOGOUT_USER":
      auth.signOut();
      return { initialState };
    default:
      return state;
  }
};

export default userReducer;
