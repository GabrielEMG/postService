import { Row, InputGroup, FormControl } from "react-bootstrap";

type Props = {
  label: String;
  placeholder: string;
  name: string;
  setState: Function;
};

const CustomInputText: React.FC<Props> = (props): JSX.Element => {
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

export default CustomInputText;
