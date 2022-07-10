import "./App.css";
import React from "react";
import PreviewerPage from "./components/PreviewerPage";
import { SignIn } from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { ReactSession } from "react-client-session";
import Profile from "./components/Profile";
import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

ReactSession.setStoreType("localstorage");
ReactSession.remove("token");
export const LoginStatus = createContext()

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <>
      <LoginStatus.Provider value={[loginStatus, setLoginStatus]}>
      <Header />
      <Routes>
        <Route path="/" element={<PreviewerPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </LoginStatus.Provider>
    </>
  );
}

export default App;

