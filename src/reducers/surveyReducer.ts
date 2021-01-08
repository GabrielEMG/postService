type Question = {
  answers: any;
  index: number;
  title: string;
  type: string;
}

type Survey = {
  title: string;
  owner: string;
  date: Date;
  questions: Question[];
  ready?: boolean;
}

type setSurveyState = {
  type: string;
  payload: any;
}

type answerSurveyState = {
  type: string;
  payload: {
    questionId: number;
    answer: String;
  }
}

type SurveyAction = setSurveyState | answerSurveyState;

const initialState: Survey = {
  title: "",
  owner: "",
  date: new Date(),
  questions: [],
};



const surveyReducer = (state: Survey = initialState, action: SurveyAction): Survey => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SURVEY_STATE":
      const setQuestions: Question[] = payload.questions.map((question: Question): Question => {
        let ans: any;
        if (question.type === "boolean-choice" || question.type ==="single-choice" || question.type ==="multi-choice") {
          question.answers.forEach((a: string): void => {
            ans = { ...ans, [a]: false };
          });
        } else if (question.type === "grade-choice") {
          ans = 6
        } else if (question.type === "text-input") {
          ans = ""
        }
        return {...question, answers: ans}
      })
      return {
        ...state,
        title: payload.title,
        owner: payload.owner,
        ready: true,
        questions: setQuestions,
      };
  
    case "UPDATE_SINGLE_QUESTION_ANSWER":
      let sqCopy = { ...state };
      Object.keys(state.questions[payload.questionId].answers).forEach(
        (key) => (sqCopy.questions[payload.questionId].answers[key] = false)
      );
      sqCopy.questions[payload.questionId].answers[payload.answer] = true;
      return sqCopy;
    case "UPDATE_MULTI_QUESTION_ANSWER":
      let mqCopy:Survey = { ...state };
      mqCopy.questions[payload.questionId].answers[payload.answer] = !mqCopy
        .questions[payload.questionId].answers[payload.answer];
      return mqCopy;
    case "UPDATE_GRADE_QUESTION_ANSWER":
      let gqCopy:Survey = { ...state };
      gqCopy.questions[payload.questionId].answers = payload.answer;
      return gqCopy;
    case "UPDATE_TEXTINPUT_QUESTION_ANSWER":
      let tqCopy:Survey = { ...state };
      tqCopy.questions[payload.questionId].answers = payload.answer;
      return tqCopy;
    default:
      return state;
  }
};

export default surveyReducer;
