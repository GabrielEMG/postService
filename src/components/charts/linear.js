import { Line } from "react-chartjs-2";
import { sameDay, getDaysArray, formatDate } from "../../helpers/dateHelper";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const CustomLinear = (props) => {
  const { labels, data, bgc, date, index } = props;
  const wdim = useWindowDimensions();

  const daysLabel = getDaysArray(date.initial, date.ending);
  const linearDataset = labels.map((choice, ind) => {
    const labelData = daysLabel.map((day) => {
      let count = 0;
      data.forEach((doc) => {
        if (sameDay(day, new Date(doc.date))) {
          try {
            if (doc.questions[index].answers[choice]) {
              count = count + 1;
            }
          } catch (err) {
            console.log(err.message, index, doc.title);
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
      height={null}
      width={null}
      data={linearData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: wdim.width > 800 ? 4 : 2,
        legend: {
          display: true,
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
                userCallback: function (label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
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
