import React from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Col, Container, Row } from "react-bootstrap";

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
    <Col md={4}>
      <Doughnut
        data={{
          labels: ["", labels[ind]],
          datasets: [
            {
              data: [100 - val, val],
              label: labels[ind],
              backgroundColor: ["rgba(200,200,200,0.5)", bgc[ind]],
            },
          ],
        }}
      />
    </Col>
  ));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: props.question.title,
        data: data,
        backgroundColor: bgc,
      },
    ],
  };

  return (
    <Container>
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
                    else return Math.round((100 * value) / reducedData) + "%";
                  },
                },
              },
            }}
          />
        </Col>
        {allcharts}
      </Row>
    </Container>
  );
};

export default MultiChoiceCharts;
