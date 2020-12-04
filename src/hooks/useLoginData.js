import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useFirebaseData from "./useFirebaseData";

const useLoginData = () => {
  const dispatch = useDispatch();
  const user = useSelector((selector) => selector.user);
  const surveyState = useFirebaseData("survey", ["owner", "==", user.email]);
  const responseState = useFirebaseData("survey-responses", [
    "owner",
    "==",
    user.email,
  ]);

  useEffect(() => {
    user.email &&
      dispatch({
        type: "SET_SURVEYS",
        payload: surveyState.data,
      });
  }, [surveyState.data]);

  useEffect(() => {
    user.email &&
      dispatch({
        type: "SET_DATA",
        payload: responseState.data,
      });
  }, [responseState.data]);

  useEffect(() => {
    !surveyState.loading &&
      !responseState.loading &&
      dispatch({
        type: "END_LOADING",
      });
  }, [surveyState.loading, responseState.loading]);
};

export default useLoginData;
