
import About from "./pages/about/About";
import Appointment from "./pages/appointment/Appointment";
import AddDoctors from "./pages/dashboard/AddDoctors";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageDoctors from "./pages/dashboard/ManageDoctors";
import MyAppointments from "./pages/dashboard/MyAppointments";
import MyHistory from "./pages/dashboard/MyHistory";
import MyReviews from "./pages/dashboard/MyReviews";
import Payment from "./pages/dashboard/Payment";
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
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/appointment" element={<RequireAuth><Appointment /></RequireAuth>}></Route>
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<MyAppointments />}></Route>
          <Route path="myreviews" element={<MyReviews />}></Route>
          <Route path="myhistory" element={<MyHistory />}></Route>
          <Route path="payment/:id" element={<Payment />}></Route>
          <Route path="users" element={<RequireAdmin><Users /></RequireAdmin>}></Route>
          <Route path="addDoctor" element={<RequireAdmin><AddDoctors /></RequireAdmin>}></Route>
          <Route path="manageDoctor" element={<RequireAdmin><ManageDoctors /></RequireAdmin>}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
