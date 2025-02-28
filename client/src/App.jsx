
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Home from './pages/home.jsx'
import Dashboard from './pages/dashboard.jsx';
import ReportProblem from './pages/reportprolem';
function App() {
  return <BrowserRouter>
  <Routes> 
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/reportproblem' element={<ReportProblem/>} />
  </Routes>
  </BrowserRouter>
}

export default App;