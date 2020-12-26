import React from "react";
import { Doughnut, Bar, Pie, Line, HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { devEstHelper, avrgHelper } from "./helpers";
import { Col, Row, Container } from "react-bootstrap";
import { getDaysArray, sameDay, formatDate } from "./helpers";

const GradeChoiceCharts = (props) => {
  const answers = props.data.map((doc) => {
    const d = doc.questions.find((q) => q.title === props.question.title);
    if (d) return d.answers;
    else return "0";
  });
  const parseAns = answers.map((a) => JSON.parse(a));
  const avrg = avrgHelper(parseAns);
  const devest = devEstHelper(parseAns);
  const notAvrg = 10 - avrg;

  const barLabel = new Array(10).fill().map((x, i) => i + 1);
  const barData = barLabel.map((i) => {
    let count = 0;
    parseAns.forEach((e) => {
      if (e === i) count += 1;
    });
    return count;
  });

  const daysLabel = getDaysArray(props.date.initial, props.date.ending);
  const linearDataset = barLabel.map((choice, ind) => {
    const data = daysLabel.map((day) => {
      let count = 0;
      props.data.forEach((doc) => {
        if (sameDay(day, new Date(doc.date.seconds * 1000))) {
          if (
            doc.questions[props.question.index].answers ===
            JSON.stringify(choice)
          ) {
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
    labels: barLabel,
    datasets: [
      {
        label: props.question.title,
        data: barData,
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
                        max: Math.max(...barData),
                        stepSize: Math.ceil(Math.max(...barData) / 5),
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
                  position: "right",
                },
                plugins: {
                  datalabels: {
                    display: true,
                    color: "black",
                    formatter: (value, context) => {
                      if (value === 0) return "";
                      else return (100 * value) / barData.length + "%";
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

      <Row>
        <Col sm={6}>
          <h6 style={{ textAlign: "center" }}>Nota Promedio</h6>
          <Doughnut
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
              plugins: {
                datalabels: {
                  display: false,
                },
              },
            }}
            data={{
              labels: ["Para llegar a 10", "Nota"],
              text: avrg.toFixed(1),
              datasets: [
                {
                  data: [notAvrg, avrg],
                  backgroundColor: [
                    "rgba(230,230,230,0.2)",
                    "rgba(54,162,235,0.6)",
                  ],
                  borderColor: "black",
                  borderWidth: 0.5,
                },
              ],
            }}
          />
        </Col>
        <Col sm={6}>
          <h6 style={{ textAlign: "center" }}>Desviación estandar</h6>
          <Doughnut
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
              plugins: {
                datalabels: {
                  display: false,
                },
              },
            }}
            data={{
              labels: ["Para llegar a 4.5", "Desviación estandar"],
              text: devest.toFixed(1),
              datasets: [
                {
                  data: [devest - 4.5, devest],
                  backgroundColor: [
                    "rgba(230,230,230,0.2)",
                    "rgba(54,162,235,0.6)",
                  ],
                  borderColor: "black",
                  borderWidth: 0.5,
                },
              ],
            }}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm={7}></Col>
      </Row>
    </Container>
  );
};

export default GradeChoiceCharts;

const bgc = [
  "rgba(255,99,132,0.6)",
  "rgba(54,162,235,0.6)",
  "rgba(255,206,86,0.6)",
  "rgba(10,0,222,0.6)",
  "rgba(153,102,255,0.6)",
  "rgba(255,159,64,0.6)",
  "rgba(255,99,132,0.6)",
  "rgba(120,25,255,0.6)",
  "rgba(20,154,12,0.6)",
  "rgba(220,24,212,0.6)",
];
