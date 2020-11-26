const initialState = {
  loading: false,
  clients: [],
  keys: [],
  survey: {},
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_CLIENTS":
      return { ...state, clients: payload };
    case "ADD_KEY":
      let newState = state;
      newState.keys.push(payload);
      return { ...newState };
    default:
      return state;
  }
};

export default adminReducer;
