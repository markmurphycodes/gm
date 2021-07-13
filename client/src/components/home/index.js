import React, { useState, useEffect } from "react";

import Loader from "../utils/loader";

const Home = () => {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
  }, []);

  return (
    <>
      <Uploader />
      <div>Home</div>
      {loading ? <Loader /> : <div>Home</div>}
    </>
  );
};

export default Home;
