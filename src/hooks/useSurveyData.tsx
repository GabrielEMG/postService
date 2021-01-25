import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../firebase";

type SurveyState = {
  owner: string;
  survey: string;
  key: string;
  error: string;
  isLoading: boolean;
  isSending: boolean;
  responded: boolean;
};

type SurveyReducer = {
  title: string;
  owner: string;
  date: Date;
  questions: any[];
};

const useSurveyData = (): [SurveyState, Function] => {
  const { keyId } = useParams<any>();
  const dispatch = useDispatch();
  const survey = useSelector((selector: any): SurveyReducer => selector.survey);
  const [state, setState] = React.useState<SurveyState>({
    owner: "",
    survey: "",
    key: "",
    error: "",
    isLoading: true,
    isSending: false,
    responded: false,
  });

  console.log(state);

  //checking data from route
  React.useEffect(() => {
    try {
      firebase
        .database()
        .ref("keys/" + keyId)
        .once("value", (snapshot): void => {
          const doc = snapshot.val();
          if (doc) {
            setState((prev) => ({
              ...prev,
              ...doc,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: "ERROR 404",
            }));
          }
        });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.log(err.message);
    }
  }, [keyId]);

  //getting survey from route data
  React.useEffect(() => {
    if (state.owner) {
      try {
        firebase
          .database()
          .ref(`surveys/${state.owner}/${state.survey}`)
          .once("value", (snapshot) => {
            dispatch({ type: "SET_SURVEY_STATE", payload: snapshot.val() });
            setState((prev) => ({ ...prev, isLoading: false }));
          });
      } catch (err) {
        setState((prev) => ({ ...prev, isLoading: false }));
        console.log(err.message);
      }
    }
  }, [dispatch, state.owner, state.survey]);

  //sendingSurvey
  const sendSurvey = async () => {
    try {
      setState((prev) => ({ ...prev, isSending: true, error: "" }));
      await firebase
        .database()
        .ref(`responses/${state.owner}/${state.survey}/${state.key}`)
        .set({
          ...survey,
          survey: state.survey,
          date: new Date().toString(),
        });
      await firebase
        .database()
        .ref(`keys/${state.key}`)
        .update({ responded: true });
      setState((prev) => ({
        ...prev,
        isSending: false,
        responded: true,
        error: "",
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.message,
        isSending: false,
        responded: false,
      }));
      alert(err.message);
    }
  };
  return [state, sendSurvey];
};

export default useSurveyData;
