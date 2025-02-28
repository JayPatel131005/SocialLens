
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Home from './pages/home.jsx'
import Dashboard from './pages/dashboard.jsx';
function App() {
  return <BrowserRouter>
  <Routes> 
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
  </Routes>
  </BrowserRouter>
}

export default App;