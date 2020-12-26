import React from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Col, Container, Row } from "react-bootstrap";
import {
  getDaysArray,
  sameDay,
  formatDate,
} from "../.../../../../../../../helpers/dateHelper";

const MultiChoiceCharts = (props) => {
  const answers = props.data.map(
    (doc) => doc.questions.find((q) => q.title === props.question.title).answers
  );

  const newData = props.question.answers.map((ans) => {
    let count = 0;
    answers.forEach((a) => {
      if (a[ans]) count = count + 1;
    });
    return { [ans]: count };
  });

  const labels = newData.map((doc) => Object.keys(doc)[0]);
  const data = newData.map((doc) => doc[Object.keys(doc)]);

  const reducedData = data.reduce((acc, val) => acc + val);

  const votes = answers.length;
  const percentageVote = data.map((d) => Math.round((100 * d) / votes));

  const bgc = [
    "rgba(255,99,132,0.6)",
    "rgba(54,162,235,0.6)",
    "rgba(255,206,86,0.6)",
    "rgba(10,0,222,0.6)",
    "rgba(153,102,255,0.6)",
    "rgba(255,159,64,0.6)",
    "rgba(255,99,132,0.6)",
  ];

  const allcharts = percentageVote.map((val, ind) => (
    <Col lg={2} sm={3} xs={6}>
      <h6 style={{ textAlign: "center" }}>{labels[ind]}</h6>
      <Doughnut
        options={{
          responsive: true,
          maintainAspectRatio: true,
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: labels[ind],
          },

          plugins: {
            datalabels: {
              display: true,
              color: "black",

              formatter: (value, context) => {
                return "";
              },
            },
          },
        }}
        data={{
          labels: ["Para llegar a 100%", labels[ind]],
          text: `${val}%`,
          datasets: [
            {
              data: [100 - val, val],
              label: labels[ind],
              backgroundColor: ["rgba(230,230,230,0.2)", bgc[ind]],
              borderColor: "black",
              borderWidth: 0.5,
            },
          ],
        }}
      />
    </Col>
  ));

  const daysLabel = getDaysArray(props.date.initial, props.date.ending);

  const linearDataset = labels.map((choice, ind) => {
    const data = daysLabel.map((day) => {
      let count = 0;
      props.data.forEach((doc) => {
        if (sameDay(day, new Date(doc.date.seconds * 1000))) {
          if (doc.questions[props.question.index].answers[choice]) {
            count = count + 1;
          }
        }
      });
      return count;
    });
    return { label: choice, data, borderColor: bgc[ind], fill: false };
  });

  const i = linearDataset.reduce((accc, doc) => {
    const max = Math.max(...doc.data);
    if (max > accc) return max;
    else return accc;
  });
  const linearData = {
    labels: daysLabel.map((date) => formatDate(date)),
    datasets: linearDataset,
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: props.question.title,
        data: data,
        backgroundColor: bgc,
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <Container className="border border-dark rounded bg-light p-4">
      <Row className="justify-content-center ">
        <h3>{props.question.title}</h3>
      </Row>
      <Row className="my-4">
        <Col lg={6}>
          <Row>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                title: {
                  display: false,
                  text: props.question.title,
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
          </Row>
          <Row>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                title: {
                  display: false,
                  text: props.question.title,
                  position: "top",
                },
                legend: {
                  display: true,
                  position: "left",
                },
                plugins: {
                  datalabels: {
                    display: true,
                    color: "black",
                    formatter: (value, context) => {
                      if (value === 0) return "";
                      else return Math.round((100 * value) / reducedData) + "%";
                    },
                  },
                },
              }}
            />
          </Row>
        </Col>

        <Col lg={6} style={{ minHeight: "250px" }}>
          <Line
            data={linearData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
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
              },
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">{allcharts}</Row>
    </Container>
  );
};

export default MultiChoiceCharts;
