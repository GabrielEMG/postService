import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SurveyDisplay from "../surveyDisplay";
import { Button } from "react-bootstrap";

const SurveySelector = () => {
  const [surveySelected, setSurveySelected] = useState(0);
  const user = useSelector((selector) => selector.user);

  return (
    <div className="bg-danger">
      {user.surveys.length > 1 &&
        user.surveys.map((e, i) => (
          <Button
            style={{ backgroundColor: surveySelected === i ? "green" : "blue" }}
            onClick={() => setSurveySelected(i)}
          >
            {e.title}
          </Button>
        ))}

      {user.surveys.length === 0 ? (
        <h1>no tienes encuestas creadas</h1>
      ) : (
        <SurveyDisplay ind={surveySelected} />
      )}
    </div>
  );
};

export default SurveySelector;
