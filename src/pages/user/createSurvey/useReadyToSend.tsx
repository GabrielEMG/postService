import React from "react";
import { useSelector } from "react-redux";

type Question = {
  answers: any;
  index: number;
  title: string;
  type: string;
};

type CreateSurvey = {
  title: string;
  owner: string;
  questions: Question[];
  createdAt?: Date;
  ready?: boolean;
};

const useReadyToSend: Function = (): boolean => {
  const survey: CreateSurvey = useSelector(
    (selector: any): CreateSurvey => selector.createSurvey
  );
  const [isReadyToSend, setIsReadyToSend] = React.useState<boolean>(false);
  const questionsCount: number = survey.questions.length;

  React.useEffect(() => {
    let questionReady: number = 0;
    survey.questions.forEach((question: Question): any => {
      if (
        question.type === "grade-choice" ||
        question.type === "textfield-input"
      ) {
        if (question.title.length >= 5) questionReady += 1;
      }
      if (
        question.type === "single-choice" ||
        question.type === "multi-choice" ||
        question.type === "boolean-choice"
      ) {
        let ansReady: number = 0;
        const ansCount: number = question.answers.length;
        question.answers.forEach((ans: string): any => {
          if (ans.length > 0) ansReady += 1;
        });
        if (question.title.length >= 5 && ansReady === ansCount)
          questionReady += 1;
      }
    });
    setIsReadyToSend(
      questionsCount === questionReady && survey.title.length >= 10
    );
  }, [questionsCount, survey]);
  return isReadyToSend;
};

export default useReadyToSend;
