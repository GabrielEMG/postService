import React from "react";
import { auth, firebase } from "../firebase";
import { useDispatch, useSelector } from "react-redux";

type User = {
  email: string;
  uid: string;
  isLoading: boolean;
  isDataLoading: boolean;
  loadingErrors: string;
  isAdmin: boolean;
  surveys: any[];
  surveyData: any[];
};

const useFirebase: Function = (): void => {
  const dispatch = useDispatch();
  const user: User = useSelector((selector: any): User => selector.user);

  React.useEffect(() => {
    auth.onAuthStateChanged((u: firebase.User | null): void => {
      if (u) {
        firebase
          .database()
          .ref(`user/${u.uid}`)
          .on("value", (snapshot) => {
            const newPayload = snapshot.val();
            console.log(newPayload);
            newPayload &&
              dispatch({
                type: "LOGIN_USER",
                payload: newPayload,
              });
          });
      } else {
        dispatch({
          type: "LOGOUT_USER",
        });
      }
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (user.uid) {
      user.surveys.forEach((s: { key: string }, i: number) => {
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
            let data: any[] = [];
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
  }, [user.uid, user.surveys, dispatch]);

  React.useEffect(() => {
    if (user.isAdmin)
      firebase
        .database()
        .ref(`requests`)
        .on("value", (snapshot) => {
          let data: any[] = [];
          snapshot.forEach((key) => {
            data.push(key.val());
          });
          dispatch({
            type: "ADMIN_GET_REQUESTS",
            payload: data,
          });
        });
    firebase
      .database()
      .ref(`bugReports`)
      .on("value", (snapshot) => {
        let data: any[] = [];
        snapshot.forEach((key) => {
          data.push(key.val());
        });
        dispatch({
          type: "ADMIN_GET_BUGREPORTS",
          payload: data,
        });
      });
  }, [user.isAdmin]);
};

export default useFirebase;
