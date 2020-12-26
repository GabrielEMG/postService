const initialState = {
  email: null,
  uid: null,
  isLoading: true,
  isDataLoading: true,
  isLogin: false,
  loginErrors: "",
  surveys: [],
  surveyData: [{ data: [] }],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      const surveys = payload.surveys
        ? Object.keys(payload.surveys).map((o) => payload.surveys[o])
        : [];
      return {
        ...state,
        email: payload.email,
        uid: payload.uid,
        isLogin: true,
        isLoading: false,
        surveys: surveys,
      };
    case "LOGOUT_USER":
      return { ...initialState, isLoading: false, isDataLoading: false };
    case "ADD_CREATED_SURVEY":
      return { ...state, surveys: [payload, ...state.surveys] };
    case "SURVEYDATA_SLOT":
      let sd = state.surveyData;
      sd[payload.index] = {
        survey: payload.survey,
        data: [],
      };
      return { ...state, surveyData: sd };
    case "LOAD_RESPONSES":
      let od = state.surveyData;
      od[payload.index].data = payload.data;
      return { ...state, surveyData: od, isDataLoading: false };

    default:
      return state;
  }
};

export default userReducer;
