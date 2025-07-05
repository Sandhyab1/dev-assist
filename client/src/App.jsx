import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from '@mui/material'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(100)

  const apiCall = async () => {
    const response = await axios.get('http://localhost:5000/');
    console.log(response.data);
    setCount(response.data.message);
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(10)}>
          count is {count}
        </button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <Button variant="contained" onClick={() => apiCall()}>Dabba is {count}</Button>
      </div>
      
    </>
  )
}

export default App
