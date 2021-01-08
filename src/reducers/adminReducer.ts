type Survey = {
  title: string;
  owner: string;
  date: Date;
  questions: any[];
  ready?: boolean;
}

type User = {
  email: string;
  uid: string;
  surveys: Survey[];
  surveyCap: number;
}

type Admin = {
  loading: boolean;
  isLogin: boolean;
  users: User[];
  keys?: any[];
  survey?: object;
}

const initialState = {
  loading: false,
  isLogin: false,
  users: [],
  keys: [],
  survey: {},
};

type AdminAction = {
  type: string;
  payload: any;
}

const adminReducer = (state: Admin = initialState, action: AdminAction) => {
  const { type, payload } = action;
  switch (type) {
    case "ADMIN_GET_USERS":
      console.log(payload)
      let surveys: Survey[] = [];
      if (payload.surveys) {
        surveys = Object.keys(payload.surveys).map((o): Survey => payload.surveys[o]);
      }
      return { ...state, users: [...state.users, { ...payload, surveys }] };

    default:
      return state;
  }
};

export default adminReducer;
