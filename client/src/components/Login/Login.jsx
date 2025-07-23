import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import LockIcon from "@mui/icons-material/Lock";
import axios from "./axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

export function Login({ setUser }) {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleSwitch() {
    setSignup(!signup);
    setFormData({ username: "", password: "" });
  }

  const handleform = async (e) => {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = signup
        ? await axios.post("/signup", formData)
        : await axios.post("/signin", formData);
      
      // Store user token
      const userToken = res.data.token;
      localStorage.setItem("user", userToken);
      
      // Update app state
      if (setUser) {
        setUser(userToken);
      }
      
      // Dispatch custom event for App.jsx to detect
      window.dispatchEvent(new Event('user-login'));
      
      // Navigate to home page
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <>
      <form onSubmit={handleform}>
        <Paper elevation={5} className="box">
          <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            sx={{ mb: 5 }}
          >
            <LockIcon sx={{ color: "#f56320" }} />
            <Typography variant="h5">{signup ? "Signup" : "Login"}</Typography>
          </Stack>
          <TextField
            className="input username"
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            margin="normal"
            type="text"
            required
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value.trim() })
            }
          />
          <TextField
            className="input"
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            margin="normal"
            type="password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value.trim() })
            }
          />
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 2, width: "50%", backgroundColor: "#f56320" }}
            type="submit"
          >
            Login
          </Button>
          <Stack direction="row" spacing={2}>
            <p>{signup ? "Already registered?" : "Didn't Register?"}</p>
            <Typography
              sx={{ cursor: "pointer", color: "blue" }}
              onClick={handleSwitch}
            >
              {signup ? "Login" : "SignUp"}
            </Typography>
          </Stack>
        </Paper>
      </form>
    </>
  );
}
