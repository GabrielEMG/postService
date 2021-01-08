import React from "react";
import { Row, InputGroup, FormControl } from "react-bootstrap";

type Props = {
  label: string;
  setState: any;
};

const SelectForm: React.FC<Props> = (props): JSX.Element => {
  const { label, setState } = props;
  return (
    <Row>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as="select"
          custom
          onChange={(e) => setState(JSON.parse(e.target.value))}
          name="inputs-q"
        >
          {props.children}
        </FormControl>
      </InputGroup>
    </Row>
  );
};

export default SelectForm;
