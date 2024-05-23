import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import DoctorRows from "./DoctorRows";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("http://localhost:5000/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">Manage Doctors : {doctors.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <DoctorRows
                key={doctor._id}
                doctor={doctor}
                index={index}
                setDeletingDoctor={setDeletingDoctor}
              ></DoctorRows>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && <DeleteConfirmModal deletingDoctor={deletingDoctor}  refetch={refetch} setDeletingDoctor={setDeletingDoctor}></DeleteConfirmModal>}
    </div>
  );
};

export default ManageDoctors;
