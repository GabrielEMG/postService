import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";

const SurveyCharts = () => {
  const email = useSelector((selector) => selector.user.email);
  const surveys = useSelector((selector) => selector.clientSurveys);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("survey")
      .where("owner", "==", email)
      .get()
      .then((data) => {
        const surveys = data.docs.map((doc) => doc.data());
        dispatch({
          type: "GET_SURVEYS",
          payload: surveys,
        });
      })
      .catch((err) => console.log(err.message));
  }, [email]);

  console.log(surveys);
  return (
    <div>
      <h1>data</h1>
    </div>
  );
};

export default SurveyCharts;
