import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Button } from '@mui/material'
import axios from 'axios'
import Login from './components/Login/Login.jsx'  

function App() {

  const apiCall = async () => {
    const response = await axios.get('http://localhost:5000/');
    console.log(response.data);
    
  }

  return (
    <>
      <div>
       <Login />
      </div>
      
    </>
  )
}

export default App
