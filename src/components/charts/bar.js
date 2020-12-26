import { Bar } from "react-chartjs-2";

const CustomBar = (props) => {
  const { labels, title, data, bgc } = props;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: bgc,
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: false,
          text: title,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: Math.max(...data),
                stepSize: Math.ceil(Math.max(...data) / 5),
              },
            },
          ],
        },
        plugins: {
          datalabels: {
            display: true,
            color: "black",
            formatter: (value, context) => {
              if (value === 0) return "";
              else return value;
            },
          },
        },
      }}
    />
  );
};

export default CustomBar;
