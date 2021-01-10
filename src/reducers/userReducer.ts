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
  key: string;
}

type User = {
  email: string;
  uid: string;
  isLoading: boolean;
  isDataLoading: boolean;
  isLogin: boolean;
  loginErrors: string;
  surveys: Survey[];
  surveyData: any[];
  surveyCap?: number;
  name: string;
  business: string;
  region: string;
  comuna: string;
  location: string;
  surveyCount: number;
  emailConfirmed: boolean;
}

const initialState: User = {
  email: "",
  uid: "",
  isLoading: true,
  isDataLoading: true,
  isLogin: false,
  loginErrors: "",
  surveys: [],
  surveyData: [{ data: [] }],
  surveyCap: 0,
  name: "",
  business: "",
  region: "",
  location: "",
  comuna: "",
  surveyCount: 0,
  emailConfirmed: false
};

const userReducer = (state: User = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_USER":
      const surveys: Survey[] = payload.surveys
        ? Object.keys(payload.surveys).map((o): Survey => payload.surveys[o])
        : [];
      return {
        ...state,
        ...payload,        
        isLogin: true,
        isLoading: false,
        surveys: surveys,
      };
    case "LOGOUT_USER":
      return { ...initialState, isLoading: false, isDataLoading: false };
    case "ADD_CREATED_SURVEY":
      return { ...state, surveys: [payload, ...state.surveys] };
    case "SURVEYDATA_SLOT":
      let sd = state.surveyData;
      sd[payload.index] = {
        survey: payload.survey,
        data: [],
      };
      return { ...state, surveyData: sd };
    case "LOAD_RESPONSES":
      let od = state.surveyData;
      od[payload.index].data = payload.data;
      return { ...state, surveyData: od, isDataLoading: false };

    default:
      return state;
  }
};

export default userReducer;
