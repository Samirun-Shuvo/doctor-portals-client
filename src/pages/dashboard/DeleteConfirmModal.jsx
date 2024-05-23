/* eslint-disable react/prop-types */

import { toast } from "react-toastify";

const DeleteConfirmModal = ({ deletingDoctor, refetch ,setDeletingDoctor}) => {
  const { name, email } = deletingDoctor;
  const handleDelete = (email) => {
    fetch(`http://localhost:5000/doctor/${email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`Doctor : ${name} is deleted successfully`);
          setDeletingDoctor(null)
          refetch();
        }
      });
  };
  return (
    <div>
      <dialog
        id="delete_confirm_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h2 className="py-4 text-2xl text-red-500">
            Are you sure you want to delete doctor : ${name} ?
          </h2>
          <p className="text-xl">
            If you confirmed delete then you wont see again the doctor.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => handleDelete(email)}
                className=" bg-[red] text-white m-1 px-2 rounded-md"
              >
                Delete
              </button>
              <button className=" bg-[green] text-white m-1 px-2 rounded-md">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteConfirmModal;
