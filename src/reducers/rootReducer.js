import { combineReducers } from "redux";
import createSurveyReducer from "./createSurveyReducer";
import userReducer from "./userReducer";
import surveyReducer from "./surveyReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  user: userReducer,
  createSurvey: createSurveyReducer,
  survey: surveyReducer,
  admin: adminReducer,
});

export default rootReducer;
