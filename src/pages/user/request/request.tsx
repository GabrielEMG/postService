import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomSelector from "../../../components/customSelector";
import { useSelector } from "react-redux";

type Survey = {
  title: string;
  owner: string;
  key: string;
};

type User = {
  email: string;
  uid: string;
  surveys: Survey[];
  business: string;
  region: string;
  comuna: string;
  location: string;
};

const Request: React.FC = (): JSX.Element => {
  const [state, setState] = React.useState({
    survey: "",
  });
  const user: User = useSelector((selector: any): User => selector.user);

  const selectSurvey: Function = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setState((prev) => ({ ...prev, survey: e.target.value }));
  };

  return (
    <Container>
      <Col>
        <Row className="justify-content-center">
          <h4>Solicitar tarjetas</h4>
        </Row>
        <Row>
          <Col>
            <CustomSelector
              onChange={selectSurvey}
              value={state.survey}
              label="Seleccionar encuesta"
            >
              {user.surveys.map(
                (survey: Survey): JSX.Element => (
                  <option value={survey.key}>{survey.title}</option>
                )
              )}
            </CustomSelector>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Request;
