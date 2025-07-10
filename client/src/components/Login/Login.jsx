import React from 'react'
import './Login.css'
import { TextField, Button, Typography, Box,Container, Grid } from '@mui/material';
import { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import {auth,provider} from '../../firebase/firebase.js';
import {signInWithPopup} from 'firebase/auth';


export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Signing Up with:', formData);
    } else {
      console.log('Signing In with:', formData);
    }
  };



  return (
    <div>
      <Container maxWidth="sm">
        <Box className="login-container">
        <Typography variant="h5" mb={3}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Typography>

        <form onSubmit={handleSubmit}>

            {isSignUp && (
            <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField label="FirstName" variant="outlined" name='firstName' fullWidth required onChange={handleChange}
                  value={formData.firstName} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Last Name" variant="outlined" name='lastName' fullWidth required onChange={handleChange}
                  value={formData.lastName} />
            </Grid> </Grid> )}

              <TextField label="Username" variant="outlined" name='username' fullWidth required onChange={handleChange}
                  value={formData.username} />

              <TextField label="Password" variant="outlined" name='password' fullWidth required type="password" onChange={handleChange}
                  value={formData.password} />

            {isSignUp && (
              <TextField label="Confirm Password" variant="outlined" name='confirmPassword' fullWidth required type="password" onChange={handleChange}
                  value={formData.confirmPassword} />
            )}
            <Button
            fullWidth
            type="submit"
            variant="contained"
            className="login-button"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Typography variant="body2" mt={1}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"} &nbsp;
            <Button onClick={switchMode} className="toggle-button">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </Typography>

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
        </Box>

</Container>

    </div>
  )
}
