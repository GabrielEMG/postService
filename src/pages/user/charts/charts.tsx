import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import QuestionChart from "./questionChart";
import DateSelector from "../../../components/dateSelector";
import PaperBG from "../../../components/paperBG";

type Question = {
  answers: any;
  index: number;
  title: string;
  type: string;
};

type Survey = {
  title: string;
  owner: string;
  date: Date;
  questions: Question[];
  ready?: boolean;
};

type User = {
  email: string;
  uid: string;
  isLoading: boolean;
  isDataLoading: boolean;
  isLogin: boolean;
  loginErrors: string;
  surveys: Survey[];
  surveyData: any[];
  surveyCap?: number;
};

type DateRange = {
  initial: Date;
  ending: Date;
};

const Charts: React.FC<{ ind: number }> = (props): JSX.Element => {
  const user: User = useSelector((selector: any): User => selector.user);

  const survey: Survey = user.surveys[props.ind];

  const surveyData: any = user.surveyData[props.ind].data;

  const [data, setData] = React.useState<any[]>([]);
  const [filterDate, setFilterDate] = React.useState<DateRange>({
    initial: new Date(new Date().setDate(new Date().getDate() - 7)),
    ending: new Date(),
  });

  React.useEffect(() => {
    setFilterDate(
      (prev: DateRange): DateRange => ({ ...prev, ending: new Date() })
    );
  }, [surveyData, user.isDataLoading]);

  React.useEffect(() => {
    if (!user.isDataLoading) {
      surveyData &&
        setData(() =>
          surveyData.filter(
            (doc: any): boolean =>
              doc.date &&
              new Date(doc.date) >= filterDate.initial &&
              new Date(doc.date) <= filterDate.ending
          )
        );
    }
  }, [surveyData, user.isDataLoading, filterDate]);

  return (
    <Container>
      {survey.questions && (
        <>
          <PaperBG>
            <Row>
              <Col>
                <h4>Votos durante fechas: {data ? data.length : 0}</h4>
              </Col>
              <Col>
                <DateSelector date={filterDate} onChange={setFilterDate} />
              </Col>
            </Row>
          </PaperBG>

          <Row style={{ marginBottom: 40 }}>
            <Col>
              {survey.questions.map((question, index) => (
                <QuestionChart
                  key={index}
                  question={question}
                  data={data ? data : []}
                  date={filterDate}
                />
              ))}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Charts;
