import React, { Component, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { toast } from "react-toastify";
import { API } from "../global";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";
function Profile() {
  const navigate = useNavigate();
  const [changeDetails, setchangeDetails] = useState(false);
  const [name, setname] = useState("");
  const [user, setUser] = useState({});

  const onUse=()=> {
    navigate('/')
  }

  useEffect(() => {
    fetch(`${API}/users/me`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + ReactSession.get("token"),
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.name = data.name.toUpperCase();
        data.email = data.email.toUpperCase();
        setUser(data);
        ReactSession.set("uid", data.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <header className="profileHeader">
        <h2 className="pageHeader">My Profile</h2>
      </header>
      <main>
        <div className="profileCard">
          <TextField
            margin="normal"
            required
            name="name"
            label="Full Name"
            type="name"
            id="name"
            value={user.name}
            sx={{ maxWidth: 1 / 4 }}
          />
          <TextField
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            value={user.email}
            sx={{ maxWidth: 1 / 4 }}
          />
        </div>
        <div className="save">
          <Button variant="outlined" sx={{ height: 30 }} onClick={onUse}>
            Continue using the tool
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
