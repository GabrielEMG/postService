const initialState = {
  email: null,
  loading: true,
  loginErrors: "",
  surveys: [],
  surveyData: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MOUNT_USER_DATA":
      return payload;
    case "LOGIN_USER":
      return { ...state, email: payload };
    case "LOGOUT_USER":
      return { ...initialState, loading: false };
    case "SET_SURVEYS":
      return { ...state, surveys: payload };
    case "SET_DATA":
      const surveyOrdered = state.surveys.map((survey) =>
        payload.filter((doc) => doc.title === survey.title)
      );
      return { ...state, surveyData: surveyOrdered };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "ERROR_DATA_DISPATCH":
      return { ...state, loading: false, loadingErrors: payload };
    default:
      return state;
  }
};

export default userReducer;
