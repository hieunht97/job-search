import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/User/login/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/User/register/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </Routes>
      
    </BrowserRouter>
  );
}

export default App
