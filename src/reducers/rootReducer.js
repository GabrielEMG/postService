import { combineReducers } from "redux";
import createSurveyReducer from "./createSurveyReducer";
import userReducer from "./userReducer";
import surveyReducer from "./surveyReducer";

const rootReducer = combineReducers({
  user: userReducer,
  createSurvey: createSurveyReducer,
  survey: surveyReducer,
});

export default rootReducer;
