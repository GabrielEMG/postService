type Survey = {
  title: string;
  owner: string;
  date: Date;
  questions: any[];
  ready?: boolean;
};

type User = {
  email: string;
  uid: string;
  surveys: Survey[];
  surveyCap: number;
};

type BugReport = {
  anonymous: boolean;
  date: Date;
  read: boolean;
  response: string;
  solved: boolean;
  text: string;
  type: string;
  user: string;
  key: string;
};

type Admin = {
  loading: boolean;
  isLogin: boolean;
  users: User[];
  keys?: any[];
  surveys: Survey[];
  bugReports: BugReport[];
};

const initialState = {
  loading: false,
  isLogin: false,
  users: [],
  keys: [],
  surveys: [],
  bugReports: [],
};

const adminReducer = (state: Admin = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "ADMIN_GET_USERS":
      console.log(payload);
      let surveys: Survey[] = [];
      if (payload.surveys) {
        surveys = Object.keys(payload.surveys).map(
          (o): Survey => payload.surveys[o]
        );
      }
      return { ...state, users: [...state.users, { ...payload, surveys }] };
    case "ADMIN_GET_REQUESTS":
      return { ...state, requests: payload, date: new Date(payload.date) };
    case "ADMIN_GET_BUGREPORTS":
      return { ...state, bugReports: payload, date: new Date(payload.date) };
    default:
      return state;
  }
};

export default adminReducer;
