import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
import "chartjs-plugin-datalabels";

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
  props.data.map((doc) => {
    if (!datesArr.includes(doc.date.seconds)) datesArr.push(doc.date.seconds);
  });

  console.log("datesArr", datesArr);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: props.question.title,
        data: data,
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(10,0,222,0.6)",
          "rgba(153,102,255,0.6)",
          "rgba(255,159,64,0.6)",
          "rgba(255,99,132,0.6)",
        ],
      },
    ],
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <Bar
            data={chartData}
            options={{
              title: {
                display: true,
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
                      max: Math.max(...data) + 1,
                    },
                  },
                ],
              },
            }}
          />
        </Col>
        <Col md={6}>
          <Pie
            data={chartData}
            options={{
              title: {
                display: true,
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
                    else return (100 * value) / data.length + "%";
                  },
                },
              },
            }}
          />
        </Col>
        <Col md={12}>
          <Line />
        </Col>
      </Row>
    </Container>
  );
};

export default SingleChoice;
