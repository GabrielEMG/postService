import React from "react";
import { Doughnut, Bar, Pie, Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Col, Row, Container } from "react-bootstrap";
import {
  getDaysArray,
  sameDay,
  formatDate,
  devEstHelper,
  avrgHelper,
} from "../../../../../helpers/dateHelper";

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

  const barLabel = new Array(10).fill().map((_, i) => i + 1);
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
        if (sameDay(day, new Date(doc.date))) {
          const docChoice = doc.questions[props.question.index].answers;
          if (docChoice === choice || docChoice === JSON.stringify(choice)) {
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

  console.log(linearData);

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
    <Container className="p-4">
      <Row className="justify-content-center">
        <h3>{props.question.title}</h3>
      </Row>

      <Row>
        <Col>
          <Row>
            <Line
              height={null}
              width={null}
              data={linearData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 4,
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
          </Row>
          <Row>
            <Col md={6}>
              <Bar
                width={null}
                height={null}
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 2,
                  title: {
                    display: false,
                    text: props.question.title,
                  },
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
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
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                      },
                    },
                  },
                }}
              />
            </Col>
            <Col md={6}>
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
                    text: props.question.title,
                    position: "top",
                  },
                  legend: {
                    display: false,
                    position: "right",
                  },
                  plugins: {
                    datalabels: {
                      display: true,
                      color: "black",
                      formatter: (value) => {
                        const percentage = (
                          (100 * value) /
                          props.data.length
                        ).toFixed(0);
                        if (percentage <= 5) return "";
                        else return percentage + "%";
                      },
                    },
                  },
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          <h6 style={{ textAlign: "center" }}>Nota Promedio</h6>
          <Doughnut
            height={null}
            width={null}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 3,
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
            height={null}
            width={null}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 3,
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
