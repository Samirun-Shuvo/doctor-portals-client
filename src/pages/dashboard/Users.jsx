import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import UserRows from "./UserRows";

const Users = () => {
  const { data: users, isLoading,refetch } = useQuery("users", () =>
    fetch("http://localhost:5000/user",{
        method: "GET",
        headers: {
            authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">All Users : {users?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {
                users?.map(user =><UserRows key={user._id} user={user} refetch={refetch}></UserRows>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
