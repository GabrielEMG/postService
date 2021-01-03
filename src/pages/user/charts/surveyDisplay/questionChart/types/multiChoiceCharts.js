import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import { Col, Container, Row } from "react-bootstrap";

import { CustomBar, CustomLinear } from "../../../../../../components/charts";

const MultiChoiceCharts = (props) => {
  const answers = props.data.map((doc) => {
    const d = doc.questions.find((q) => q.title === props.question.title);
    if (d) return d.answers;
    else return [];
  });

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
    <Col md={4} xs={6} key={ind}>
      <h6 style={{ textAlign: "center" }}>{labels[ind]}</h6>
      <Doughnut
        height={null}
        width={null}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
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

  return (
    <Container className="p-4">
      <Row className="justify-content-center ">
        <h3>{props.question.title}</h3>
      </Row>

      <Row className="p-3">
        <Col>
          <Row>
            <CustomLinear
              date={props.date}
              labels={labels}
              data={props.data}
              bgc={bgc}
              index={props.question.index}
            />
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <CustomBar
                labels={labels}
                data={data}
                bgc={bgc}
                title={props.question.title}
              />
            </Col>
            <Col md={6}>
              <Row>{allcharts}</Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MultiChoiceCharts;
