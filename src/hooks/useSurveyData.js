import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";

const useSurveyData = () => {
  const { id, key } = useParams();
  const dispatch = useDispatch();
  const survey = useSelector((selector) => selector.survey);
  const [state, setState] = useState({
    client: "",
    survey: "",
    responded: false,
    loadingSelf: true,
    loadingData: true,
    loadingSend: false,
  });

  //checking data from route
  useEffect(() => {
    const getKeyInfo = async () => {
      await db
        .collection("survey-keys")
        .doc(key)
        .get()
        .then((doc) => {
          setState(() => {
            return { ...doc.data(), loadingSelf: false };
          });
        });
    };
    getKeyInfo();
  }, [id, key]);

  //getting survey from route data
  useEffect(() => {
    const getSurvey = async () => {
      if (state.survey === id) {
        db.collection("survey")
          .doc(id)
          .get()
          .then((doc) => {
            dispatch({ type: "SET_SURVEY_STATE", payload: doc.data() });
            setState((prev) => {
              return { ...prev, loadingData: false };
            });
          })
          .catch((err) => console.log(err.message));
      } else {
        console.log("key error");
      }
    };
    getSurvey();
  }, [state.loadingSelf]);

  const sendSurvey = async () => {
    setState((prev) => {
      return { ...prev, loadingSend: true };
    });
    await db
      .collection("survey-responses")
      .doc()
      .set(survey)
      .then(() => {
        setState((prev) => {
          return { ...prev, loadingSend: false };
        });
      })
      .catch((err) => console.log(err.message));
    await db
      .collection("survey-keys")
      .doc(key)
      .update({ responded: true })
      .then(() =>
        setState((prev) => {
          return { ...prev, responded: true };
        })
      )
      .catch((err) => console.log(err.message));
  };
  return [state, sendSurvey];
};

export default useSurveyData;
