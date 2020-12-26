import { Line } from "react-chartjs-2";
import { sameDay, getDaysArray, formatDate } from "../../helpers/dateHelper";

const CustomLinear = (props) => {
  const { labels, data, bgc, date, index } = props;

  const daysLabel = getDaysArray(date.initial, date.ending);
  const linearDataset = labels.map((choice, ind) => {
    const labelData = daysLabel.map((day) => {
      let count = 0;
      data.forEach((doc) => {
        if (sameDay(day, new Date(doc.date))) {
          if (doc.questions[index].answers[choice]) {
            count = count + 1;
          }
        }
      });
      return count;
    });
    return {
      label: choice,
      data: labelData,
      borderColor: bgc[ind],
      fill: false,
    };
  });

  const linearData = {
    labels: daysLabel.map((date) => formatDate(date)),
    datasets: linearDataset,
  };

  return (
    <Line
      data={linearData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },

        plugins: {
          datalabels: {
            display: false,
          },
        },

        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }}
    />
  );
};

export default CustomLinear;
