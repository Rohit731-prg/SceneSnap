import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Sidebar from './components/Sidebar';
import User from './components/User';
import Dashboard from './components/Dashboard';
import Props from './components/Props';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route 
        path="/user" 
        element={
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <User />
            </div>
          </div>
        } 
      />
      <Route 
        path="/dashboard"
        element={
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <Dashboard />
            </div>
          </div>
        } 
      />
      <Route 
        path="/props"
        element={
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <Props />
            </div>
          </div>
        } 
      />
    </Routes>
  );
}

export default App;
