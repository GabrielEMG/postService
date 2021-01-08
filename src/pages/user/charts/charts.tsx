import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import QuestionChart from "./questionChart";
import DateSelector from "../../../components/dateSelector";

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
          <Row className="p-4 my-2 border">
            <Col>
              <Row className="justify-content-center">
                <h1>Título: {survey.title}</h1>
              </Row>
            </Col>
            <Col className="justify-content-center">
              <Row className="justify-content-center">
                <h1>Votos: {data ? data.length : 0}</h1>
              </Row>
            </Col>
          </Row>

          <DateSelector date={filterDate} onChange={setFilterDate} />

          <Row style={{ marginBottom: 40 }}>
            {survey.questions.map((question, index) => (
              <QuestionChart
                key={index}
                question={question}
                data={data ? data : []}
                date={filterDate}
              />
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Charts;
