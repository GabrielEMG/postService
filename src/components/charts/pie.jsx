import { Pie } from "react-chartjs-2";

const CustomPie = (props) => {
  const { labels, title, data, bgc, propsData } = props;

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
    <Pie
      height={null}
      width={null}
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        title: {
          display: false,
          text: title,
          position: "top",
        },
        legend: {
          display: false,
          position: "left",
        },
        plugins: {
          datalabels: {
            display: true,
            color: "black",
            formatter: (value, context) => {
              if (value === 0) return "";
              else return ((100 * value) / propsData.length).toFixed(0) + "%";
            },
          },
        },
      }}
    />
  );
};

export default CustomPie;
