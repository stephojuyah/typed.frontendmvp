import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import EnterMessage from './pages/entermessage/EnterMessage'
import EMRedirect from './pages/emredirect/EMRedirect'
import Register from './pages/register/Register'
// import Home from './pages/home/home'
import Login from './pages/login/Login'
// import Messages from './pages/messages/Messages'
// import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <EnterMessage /> */}
    {/* <EMRedirect /> */}
    {/* <Register /> */}
    {/* <Home /> */}
    {/* <Login /> */}
    {/* <Messages /> */}



     <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/emredirect' element={<EMRedirect />} />
        {/* <Route path='/reset_password' element={<ResetPassword />} /> */}
        {/* <Route path='/home' element={<ProtectedRoute><Dash /></ProtectedRoute>} /> */}
        
      </Routes>   
    </BrowserRouter>



  </StrictMode>,
)
