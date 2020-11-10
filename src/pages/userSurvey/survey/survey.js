import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import SingleChoice from "../question/singleChoice";
import MultiChoice from "../question/multiChoice";
import GradeChoice from "../question/gradeChoice";

const Survey = () => {
  const dispatch = useDispatch();
  const survey = useSelector((selector) => selector.survey);
  const { id } = useParams();
  useEffect(() => {
    const getDb = async () => {
      await db
        .collection("survey")
        .doc(id)
        .get()
        .then((doc) =>
          dispatch({ type: "SET_SURVEY_STATE", payload: doc.data() })
        )
        .catch((err) => console.log(err.message));
    };
    getDb();
  }, [id]);

  return (
    <div>
      <h1>survey</h1>
      {survey.ready &&
        survey.questions.map((question, index) => {
          if (question.type === "single-choice")
            return (
              <SingleChoice question={question} index={index} key={index} />
            );
          else if (question.type === "multi-choice")
            return (
              <MultiChoice question={question} index={index} key={index} />
            );
          else if (question.type === "grade-choice")
            return <GradeChoice question={question} index={index} />;
        })}
    </div>
  );
};

export default Survey;
