import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Register from './pages/register/Register'
// import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
// import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Register /> */}
    {/* <Login /> */}
    <Dashboard />




     {/* <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>   
    </BrowserRouter> */}



  </StrictMode>,
)
