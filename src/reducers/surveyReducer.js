const initialState = {
  title: "",
  ready: "false",
  owner: "",
  date: new Date(),
  questions: [],
};

const surveyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SURVEY_STATE":
      let arr = [];
      while (arr < payload.questions.length) arr.push("");
      while (arr > payload.questions.length) arr.pop();
      console.log(payload);
      payload.questions.forEach((question) => {
        let ans;
        switch (question.type) {
          case "single-choice":
          case "multi-choice":
            question.answers.forEach((a) => {
              ans = { ...ans, [a]: false };
            });
            break;
          case "grade-choice":
            ans = 5;
            break;
          case "text-input":
            ans = "";
            break;
          case "boolean-choice":
            ans = false;
            break;
          default:
            break;
        }
        arr[question.index] = {
          ...question,
          answers: ans,
        };
      });
      return {
        ...state,
        title: payload.title,
        owner: payload.owner,
        ready: true,
        questions: arr,
      };
    case "UPDATE_SINGLE_QUESTION_ANSWER":
      let sqCopy = { ...state };
      Object.keys(state.questions[payload.questionId].answers).forEach(
        (key) => (sqCopy.questions[payload.questionId].answers[key] = false)
      );
      sqCopy.questions[payload.questionId].answers[payload.answer] = true;
      return sqCopy;
    case "UPDATE_MULTI_QUESTION_ANSWER":
      let mqCopy = { ...state };
      mqCopy.questions[payload.questionId].answers[payload.answer] = !mqCopy
        .questions[payload.questionId].answers[payload.answer];
      return mqCopy;
    case "UPDATE_GRADE_QUESTION_ANSWER":
      let gqCopy = { ...state };
      gqCopy.questions[payload.questionId].answers = payload.answer;
      return gqCopy;
    case "UPDATE_TEXTINPUT_QUESTION_ANSWER":
      let tqCopy = { ...state };
      tqCopy.questions[payload.questionId].answers = payload.answer;
    default:
      return state;
  }
};

export default surveyReducer;
