const pulishData = (data, surveys) => {
  let dic = {
    title: "data",
  };

  const surveyTitles = surveys.map((survey) => survey.title);

  dic = surveyTitles.map((title) => {
    return {
      title: title,
      data: data
        .filter((doc) => doc.title === title)
        .map((doc) => {
          return {
            date: doc.date,
            title: doc.title,
            questions: doc.questions.map((question) => {
              return { question };
            }),
          };
        }),
    };
  });
  return dic;
};
export default pulishData;
