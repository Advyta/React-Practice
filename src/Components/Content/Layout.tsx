import React from "react";
import Login from "../Login/Login";
import { useLoginContext } from "../../Context/LoginContext";

export default function Layout() {
  const { isLoggedIn } = useLoginContext();
  return (
    <div className="container px-5">{isLoggedIn ? "Welcome" : <Login />}</div>
  );
}
