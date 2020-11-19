import { auth } from "../firebase";

const initialState = {
  email: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      return { ...state, email: payload };
    case "LOGOUT_USER":
      auth.signOut();
      return initialState;
    case "SET_SURVEYS":
      return { ...state, surveys: payload };
    case "SET_DATA":
      const surveyOrdered = state.surveys.map((survey) =>
        payload.filter((doc) => doc.title === survey.title)
      );
      return { ...state, surveyData: surveyOrdered };
    default:
      return state;
  }
};

export default userReducer;
