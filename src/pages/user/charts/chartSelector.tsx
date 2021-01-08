import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Charts from "./charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import "./chartSelector.css";

type Survey = {
  title: string;
  owner: string;
  date: Date;
  questions: any[];
  ready?: boolean;
};

const ChartSelector: React.FC = (): JSX.Element => {
  const [surveySelected, setSurveySelected] = React.useState<number>(0);
  const surveys: Survey[] = useSelector(
    (selector: any): Survey[] => selector.user.surveys
  );

  return (
    <div className="app-colors" style={{ display: "flex", width: "100%" }}>
      <Col>
        <Row className="justify-content-center">
          {surveys.length > 0 &&
            surveys.map(
              (e: Survey, i: number): JSX.Element => (
                <Col
                  key={i}
                  className={`selector-button ${
                    surveySelected === i && "selected-survey"
                  }`}
                  onClick={() => setSurveySelected(i)}
                >
                  <Row
                    className="justify-content-center"
                    style={{ height: "40px", alignItems: "center" }}
                  >
                    <FontAwesomeIcon icon={faChartPie} />
                    <h6
                      style={{
                        margin: 0,
                        marginLeft: 5,
                      }}
                    >
                      {e.title}
                    </h6>
                  </Row>
                </Col>
              )
            )}
        </Row>
        <Row>
          {surveys.length === 0 ? (
            <h1>no tienes encuestas creadas</h1>
          ) : (
            <Charts ind={surveySelected} />
          )}
        </Row>
      </Col>
    </div>
  );
};

export default ChartSelector;
