import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Button } from '@mui/material'
import { Login } from './components/Login/Login.jsx'
import Header from './components/Header/Header.jsx'

function App() {
  return (
   <>
     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path= "/header" element={<Header/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
