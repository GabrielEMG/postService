const initialState = [];

const clientSurveysReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_SURVEYS":
      console.log(payload);
      return payload;
    case "GET_SURVEY":
      return [...state, payload];
    default:
      return state;
  }
};

export default clientSurveysReducer;
