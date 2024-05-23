/* eslint-disable react/prop-types */
const DoctorRows = ({ doctor, index, setDeletingDoctor }) => {
  const { name, specialty, img } = doctor;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="w-8 rounded">
            <img src={img} alt={name} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{specialty}</td>
      <td>
        <button
          className="btn btn-xs btn-error text-white"
          onClick={async () => {
            await setDeletingDoctor(doctor);
            document.getElementById("delete_confirm_modal").showModal();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DoctorRows;
