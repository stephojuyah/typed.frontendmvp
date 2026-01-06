import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import EnterMessage from './pages/entermessage/EnterMessage'
// import EMRedirect from './pages/emredirect/EMRedirect'
// import Register from './pages/register/Register'
import Home from './pages/home/home'
// import Login from './pages/login/Login'
// import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <EnterMessage /> */}
    {/* <EMRedirect /> */}
    {/* <Register /> */}
    <Home />
    {/* <Login /> */}
  </StrictMode>,
)
