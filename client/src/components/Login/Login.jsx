import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import LockIcon from "@mui/icons-material/Lock";
import axios from "./axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css";
import { deepOrange, orange } from "@mui/material/colors";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../../firebase/firebase.js";
import { signInWithPopup } from "firebase/auth";

export function Login() {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In successful!", user);

      // Optional: Redirect or store user info
    } catch (error) {
      console.error("Google Sign-In failed:", error.message);
    }
  };

  function handleSignup() {
    setSignup(!signup);
  }

  function handleSwitch() {
    setSignup(!signup);
    setFormData({ username: "", password: "" });
  }

  const handleform = async (e) => {
    e.preventDefault();
    try {
      const res = signup
        ? await axios.post("/signin", formData)
        : await axios.post("/signup", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/Header");
      console.log(res);
    } catch (err) {
      console.log(err);
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
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="warning"
            sx={{ mt: 2, mb: 2, width: "50%" }}
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

        <Typography variant="body2" mt={2} color="textSecondary">
          OR
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          className="google-button"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>
      </form>
    </>
  );
}
