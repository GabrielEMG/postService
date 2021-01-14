import React from "react";
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import PaperBG from "../paperBG";
import es from "date-fns/locale/es";
registerLocale("es", es);

type Props = {
  date: {
    initial: Date;
    ending: Date;
  };
  onChange: any;
};

const DateSelector: React.FC<Props> = (props): JSX.Element => {
  return (
    <PaperBG>
      <Row>
        <Col>
          <Row className="justify-content-center align-items-center">
            <h6 className="mx-3" style={{ margin: 0 }}>
              Fecha inicial
            </h6>
          </Row>
          <Row className="justify-content-center align-items-center">
            <DatePicker
              locale="es"
              dateFormat="dd/MM/yyyy"
              selected={props.date.initial}
              onChange={(date: Date): any =>
                props.onChange((prev: any): any => {
                  return { ...prev, initial: date };
                })
              }
            />
          </Row>
        </Col>
        <Col className="justify-content-center">
          <Row className="justify-content-center align-items-center">
            <h6 className="mx-3" style={{ margin: 0 }}>
              Fecha término
            </h6>
          </Row>

          <Row className="justify-content-center align-items-center">
            <DatePicker
              locale="es"
              dateFormat="dd/MM/yyyy"
              selected={props.date.ending}
              onChange={(date: Date): any =>
                props.onChange((prev: any): any => {
                  return { ...prev, ending: date };
                })
              }
            />
          </Row>
        </Col>
      </Row>
    </PaperBG>
  );
};

export default DateSelector;
