import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useFirebase = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    uid: "",
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user &&
        setState(() => ({
          email: user.email,
          uid: user.uid,
        }));
    });
  }, [auth]);

  useEffect(() => {
    console.log(state.uid);
    state.uid &&
      db
        .collection("user")
        .doc(state.uid)
        .get()
        .then((doc) =>
          dispatch({
            type: "MOUNT_USER_DATA",
            payload: { ...doc.data(), ...state },
          })
        );
  }, [state.uid]);
};

export default useFirebase;
