import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const GradeChoiceCharts = (props) => {
  console.log(props);

  const answers = props.data.map(
    (doc) => doc.questions.find((q) => q.title === props.question.title).answers
  );

  const parseAns = answers.map((a) => JSON.parse(a));
  console.log(parseAns);

  const maxAcc = answers.length * 10;
  console.log(maxAcc);
  const avrg =
    parseAns.length > 1
      ? ((10 * parseAns.reduce((acc, val) => acc + val)) / maxAcc).toFixed(1)
      : 0;
  const notAvrg = 10 - avrg;

  return (
    <div>
      {
        <Doughnut
          data={{
            labels: ["nota"],
            datasets: [
              {
                label: "Nota",
                data: [avrg, notAvrg],
                backgroundColor: [
                  "rgba(54,162,235,0.6)",
                  "rgba(255,99,132,0.6)",
                ],
              },
            ],
          }}
        />
      }
    </div>
  );
};

export default GradeChoiceCharts;
