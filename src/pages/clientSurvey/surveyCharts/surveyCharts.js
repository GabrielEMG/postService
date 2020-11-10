import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";

const SurveyCharts = () => {
  const [surveyResponses, setSurveyResponses] = useState([]);
  const email = useSelector((selector) => selector.user.email);

  useEffect(() => {
    db.collection("survey-resposes")
      .where("owner", "==", email)
      .get()
      .then((data) => setSurveyResponses(data.docs.map((doc) => doc.data())))
      .catch((err) => console.log(err.message));
  }, [email]);
  console.log(surveyResponses);
  return (
    <div>
      <h1>data</h1>
    </div>
  );
};

export default SurveyCharts;
