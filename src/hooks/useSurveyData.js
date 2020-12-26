import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../firebase";

const useSurveyData = () => {
  const { keyId } = useParams();
  const dispatch = useDispatch();
  const survey = useSelector((selector) => selector.survey);
  const [state, setState] = useState({
    owner: "",
    survey: "",
    responded: false,
    key: "",
    loadingSelf: true,
    loadingData: true,
    loadingSend: false,
  });

  //checking data from route
  useEffect(() => {
    firebase
      .database()
      .ref("keys/" + keyId)
      .once("value", (snapshot) => {
        setState((prev) => ({
          ...prev,
          ...snapshot.val(),
          loadingSelf: false,
        }));
      });
  }, [keyId]);

  //getting survey from route data
  useEffect(() => {
    if (!state.loadingSelf) {
      firebase
        .database()
        .ref(`surveys/${state.owner}/${state.survey}`)
        .once("value", (snapshot) => {
          dispatch({ type: "SET_SURVEY_STATE", payload: snapshot.val() });
        });
      setState((prev) => ({ ...prev, loadingData: false }));
    }
  }, [state.loadingSelf, dispatch, state.owner, state.survey]);

  const sendSurvey = async () => {
    firebase
      .database()
      .ref(`responses/${state.owner}/${state.survey}/${state.key}`)
      .set({
        ...survey,
        survey: state.survey,
        date: new Date().toString(),
      });
    firebase.database().ref(`keys/${state.key}`).update({ responded: true });
  };
  return [state, sendSurvey];
};

export default useSurveyData;
