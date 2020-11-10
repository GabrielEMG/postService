import { combineReducers } from "redux";
import createSurveyReducer from "./createSurveyReducer";
import userReducer from "./userReducer";
import surveyReducer from "./surveyReducer";
import clientSurveysReducer from "./clientSurveysReducer";

const rootReducer = combineReducers({
  user: userReducer,
  createSurvey: createSurveyReducer,
  clientSurveys: clientSurveysReducer,
  survey: surveyReducer,
});

export default rootReducer;
