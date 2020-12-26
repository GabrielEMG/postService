const initialState = {
  loading: false,
  users: [],
  keys: [],
  survey: {},
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADMIN_GET_USERS":
      let surveys = [];
      if (payload.surveys) {
        surveys = Object.keys(payload.surveys).map((o) => payload.surveys[o]);
      }
      return { ...state, users: [...state.users, { ...payload, surveys }] };

    default:
      return state;
  }
};

export default adminReducer;
