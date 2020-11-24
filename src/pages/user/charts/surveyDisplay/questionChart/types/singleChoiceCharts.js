import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
import "chartjs-plugin-datalabels";
import { sameDay, getDaysArray, formatDate } from "./helpers";

const bgc = [
  "rgba(255,99,132,0.6)",
  "rgba(54,162,235,0.6)",
  "rgba(255,206,86,0.6)",
  "rgba(10,0,222,0.6)",
  "rgba(153,102,255,0.6)",
  "rgba(255,159,64,0.6)",
  "rgba(255,99,132,0.6)",
];

const SingleChoice = (props) => {
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
  const data =
    answers.length === 0
      ? newData.map((doc) => 0)
      : newData.map((doc) => doc[Object.keys(doc)]);

  let datesArr = [];
  props.data.forEach((doc) => {
    if (!datesArr.includes(doc.date.seconds)) datesArr.push(doc.date.seconds);
  });

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
      <Row className="justify-content-center">
        <h3>{props.question.title}</h3>
      </Row>
      <Row className="mt-3">
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
                      else
                        return (
                          ((100 * value) / props.data.length).toFixed(0) + "%"
                        );
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
    </Container>
  );
};

export default SingleChoice;
