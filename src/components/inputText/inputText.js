import { Row, InputGroup, FormControl } from "react-bootstrap";

const InputText = (props) => {
  const { label, placeholder, name, setState } = props;
  return (
    <Row className="my-2">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={(e) => setState(e)}
        />
      </InputGroup>
    </Row>
  );
};

export default InputText;
