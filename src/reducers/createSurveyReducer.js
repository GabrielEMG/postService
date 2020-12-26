const initialState = {
  title: "",
  owner: "",
  questions: [],
  createdAt: new Date(),
};

const createSurveyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_TITLE_SURVEY":
      return { ...state, title: payload };
    case "UPDATE_OWNER_SURVEY":
      return { ...state, owner: payload };
    case "ADD_QUESTION":
      let newArr = state.questions;
      newArr.push({});
      return { ...state, questions: newArr };
    case "REMOVE_QUESTION":
      let shortArr = state.questions;
      shortArr.pop();
      return { ...state, questions: shortArr };
    case "SINGLE_CHOICE_QUESTION":
      let scArr = state.questions;
      scArr[payload.index] = payload;
      return { ...state, questions: scArr };
    case "MULTI_CHOICE_QUESTION":
      let mcArr = state.questions;
      mcArr[payload.index] = payload;
      return { ...state, questions: mcArr };
    case "GRADE_CHOICE_QUESTION":
      let gcArr = state.questions;
      gcArr[payload.index] = payload;
      return { ...state, questions: gcArr };
    case "BOOLEAN_CHOICE_QUESTION":
      let bcArr = state.questions;
      bcArr[payload.index] = payload;
      return { ...state, questions: bcArr };
    default:
      return state;
  }
};

export default createSurveyReducer;
