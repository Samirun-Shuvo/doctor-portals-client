import About from "./pages/about/About";
import Appointment from "./pages/appointment/Appointment";
import Dashboard from "./pages/dashboard/Dashboard";
import MyAppointments from "./pages/dashboard/MyAppointments";
import MyHistory from "./pages/dashboard/MyHistory";
import MyReviews from "./pages/dashboard/MyReviews";
import Users from "./pages/dashboard/Users";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import RequireAdmin from "./pages/login/RequireAdmin";
import RequireAuth from "./pages/login/RequireAuth";
import SignUp from "./pages/login/SignUp";
import Navbar from "./pages/shared/Navbar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/appointment" element={<RequireAuth><Appointment></Appointment></RequireAuth>}></Route>
        <Route path="/dashboard" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyAppointments></MyAppointments>}></Route>
          <Route path="myreviews" element={<MyReviews></MyReviews>}></Route>
          <Route path="myhistory" element={<MyHistory></MyHistory>}></Route>
          <Route path="users" element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
