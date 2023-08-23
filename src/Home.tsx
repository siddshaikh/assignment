import React, { useContext, useEffect } from "react";
import SignUp from "./components/SignUp";
import { userContext } from "./context";

const Home: React.FC = () => {
  const { setActive } = useContext(userContext);
 
  useEffect(() => {
    setActive("home");
  }, []);
  return (
    <>
      <SignUp />
    </>
  );
};

export default Home;
