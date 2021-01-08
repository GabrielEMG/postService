type Question = {
  answers: any;
  index: number;
  title: string;
  type: string;
};

type Survey = {
  title: string;
  owner: string;
  questions: Question[] | any[];
  createdAt?: Date;
};

type setStringVar = {
  type: string;
  payload: any;
};

type setQuestion = {
  type: string;
  payload: Question;
};

type CreateSurveyAction = setQuestion | setStringVar;

const initialState: Survey = {
  title: "",
  owner: "",
  questions: [],
  createdAt: new Date(),
};

const createSurveyReducer = (
  state: Survey = initialState,
  action: CreateSurveyAction
) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_TITLE_SURVEY":
      return { ...state, title: payload };
    case "UPDATE_OWNER_SURVEY":
      return { ...state, owner: payload };
    case "ADD_QUESTION":
      let newArr: Question[] = state.questions;
      newArr.push({
        answers: null,
        index: state.questions.length,
        title: "",
        type: "",
      });
      return { ...state, questions: newArr };
    case "REMOVE_QUESTION":
      let shortArr: Question[] = state.questions;
      shortArr.pop();
      return { ...state, questions: shortArr };
    case "SINGLE_CHOICE_QUESTION":
    case "MULTI_CHOICE_QUESTION":
    case "GRADE_CHOICE_QUESTION":
    case "BOOLEAN_CHOICE_QUESTION":
    case "TEXT_INPUT_QUESTION":
      let tiArr: Question[] = state.questions;
      tiArr[payload.index] = payload;
      return { ...state, questions: tiArr };
    default:
      return state;
  }
};

export default createSurveyReducer;
