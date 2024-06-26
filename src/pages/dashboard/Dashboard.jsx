import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Dashboard = () => {
  const [user]=useAuthState(auth)
  const [admin]=useAdmin(user)
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        <h1 className="text-2xl font-bold text-purple-500">Welcome To Your Dashboard</h1>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-48 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className="my-1"><Link to="/dashboard">My Appointments</Link></li>
          <li className="my-1"><Link to="/dashboard/myreviews">My Reviews</Link></li>
          <li className="my-1"><Link to="/dashboard/myhistory">My History</Link></li>
          <li className="my-1">{admin && <>
            <Link className="my-1" to="/dashboard/users">All Users</Link>
            <Link className="my-1" to="/dashboard/addDoctor">Add a doctor</Link>
            <Link className="my-1" to="/dashboard/manageDoctor">Manage doctor</Link>
            </>}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
