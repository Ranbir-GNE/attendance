import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/getUser/User.jsx';
import Navbar from './components/Navbar.jsx'
import Add from './components/addUser/Add.jsx';
import Edit from './components/updateUser/Edit.jsx';
import Login from './components/login/login.jsx';
import Admin from './components/admin/admin.jsx';


const App = () => {
  return (
    <Router>
      <div>
      <Navbar /> 
      <div className="content">
          <Routes> {/* Wrap routes in a Routes component */}
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit/>} />
          </Routes>
        </div>
  </div>
  </Router>
  );
}

export default App;
