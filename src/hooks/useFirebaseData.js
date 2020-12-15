import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const useFirebaseData = (collectionName, whereLogic) => {
  const user = useSelector((selector) => selector.user);
  const [state, setState] = useState({
    loading: true,
    data: [],
    error: "",
  });
  useEffect(() => {
    setState((prev) => {
      return { ...prev, loading: true };
    });
    user.email &&
      db
        .collection(collectionName)
        .where(...whereLogic)
        .get()
        .then((data) => {
          console.log("trigger");
          const dataResolved = data.docs.map((doc) => doc.data());
          setState((prev) => {
            return { ...prev, data: dataResolved, loading: false };
          });
        })
        .catch((err) =>
          setState((prev) => {
            return { ...prev, error: err.message, loading: false };
          })
        );
  }, [user.email]);

  return state;
};

export default useFirebaseData;
