import { Row, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterInputGroup = (props) => {
  const handleChange = (e) => {
    props.onChange((prev) => ({
      ...prev,
      error: null,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Row className="justify-content-center my-4 mx-2">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text
            style={{ width: 50, justifyContent: "center", fontSize: 25 }}
          >
            <FontAwesomeIcon icon={props.icon} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) => handleChange(e)}
          name={props.name}
          onKeyDown={(e) => {
            if (props.activateFromKeyboard) {
              if (e.code === "Enter") {
                props.action();
              }
            }
          }}
          style={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: "100%",
          }}
        />
      </InputGroup>
    </Row>
  );
};

export default RegisterInputGroup;
