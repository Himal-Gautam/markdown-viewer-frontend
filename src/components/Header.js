import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { API } from "../global.js";
import { LoginStatus } from "../App";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
function Header() {
  const [status, setstatus] = useContext(LoginStatus);
  const location = useLocation();
  const navigate = useNavigate();

  const onLogIn = () => {
    console.log("login");
    navigate("/sign-in");
  };

  async function onLogOut() {
    await fetch(`${API}/users/logout`, {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    }).catch((err) => {
      console.log(err);
    });

    ReactSession.remove("token");
    setstatus(false);
  }

  return (
    <div className="App-header">
      <h3 className="title" onClick={() => navigate("/")}>
        React Markdown Previewer
      </h3>
      {location.pathname === "/sign-in" ||
      location.pathname === "/password-reset" ||
      location.pathname === "/sign-up" ? (
        <></>
      ) : (
        <div className="profileset">
          {/* <IconButton
            onClick={status ? navigate("/profile") : navigate("/login")}
          >
            <AccountCircleIcon />
          </IconButton>{" "} */}
          {status ? (
            <Button variant="contained" sx={{ height: 30 }} onClick={onLogOut}>
              Log Out
            </Button>
          ) : (
            <Button variant="contained" sx={{ height: 30 }} onClick={onLogIn}>
              Log In
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
