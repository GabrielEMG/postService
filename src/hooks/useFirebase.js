import { auth, firebase } from "../firebase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFirebase = () => {
  const dispatch = useDispatch();
  const user = useSelector((selector) => selector.user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`user/${user.uid}`)
          .once("value", (snapshot) => {
            dispatch({
              type: "LOGIN_USER",
              payload: snapshot.val(),
            });
          });
      } else {
        dispatch({
          type: "LOGOUT_USER",
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (user.uid) {
      user.surveys.forEach((s, i) => {
        dispatch({
          type: "SURVEYDATA_SLOT",
          payload: {
            survey: s.key,
            index: i,
          },
        });
        firebase
          .database()
          .ref(`responses/${user.uid}/${s.key}`)
          .on("value", (snapshot) => {
            let data = [];
            snapshot.forEach((key) => {
              data.push(key.val());
            });
            dispatch({
              type: "LOAD_RESPONSES",
              payload: {
                data: data,
                index: i,
              },
            });
          });
      });
    }
  }, [user.uid, user.surveys]);
};

export default useFirebase;
