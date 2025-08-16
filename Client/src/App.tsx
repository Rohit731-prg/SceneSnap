import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import User from "./components/User";
import Dashboard from "./components/Dashboard";
import Props from "./components/Props";
import Error from "./components/Error";
import Layout from "./components/Layout";
import OTPcheck from "./components/OTPcheck";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="otp" element={<OTPcheck />} />

      {/* Protected Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="user" element={<User />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="props" element={<Props />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
