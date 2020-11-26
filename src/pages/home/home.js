import React, { useState } from "react";
import { auth } from "../../firebase";

const Home = () => {
  const [data, setData] = useState({});
  const [token, setToken] = useState("");

  const handleClick = async () => {
    const user = await auth
      .signInWithCustomToken(token)
      .then((decodedToken) => setData(decodedToken));
  };
  return (
    <div>
      <input onChange={(e) => setToken(e.target.value)} type="text" />
      <button onClick={() => handleClick()}>getData</button>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Home;
