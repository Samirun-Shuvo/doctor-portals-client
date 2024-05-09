import { format } from "date-fns";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const BookingModal = ({ treatment, setTreatment, date,refetch }) => {
  const { _id, name, slots } = treatment;
  const [user] = useAuthState(auth);
  const formatedDate = format(date, "PP");

  const handleBooking = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formatedDate,
      slot,
      patient: user.email,
      patientName: user.displayName,
      phone: e.target.phone.value,
    };

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Appointment is set, ${formatedDate} at ${slot}`);
        } else {
          toast.error(
            `Already have an appointment on ${data?.booking?.date} at ${data?.booking?.slot}`
          );
        }
        //for close the modal
        refetch();
        setTreatment(null);
      });
  };
  return (
    <dialog id="booking-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg text-secondary">
            Booking for : {name}
          </h3>
          <div className="">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn font-bold">X</button>
            </form>
          </div>
        </div>
        <form
          onSubmit={handleBooking}
          className="grid grid-cols-1 gap-5 justify-items-center my-5"
        >
          <input
            type="text"
            value={format(date, "PP")}
            disabled
            className="input input-bordered w-full max-w-xs"
          />
          <select
            name="slot"
            className="select select-bordered w-full max-w-xs"
          >
            {slots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="name"
            disabled
            value={user?.displayName || ""}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="email"
            name="email"
            disabled
            value={user?.email || ""}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-secondary text-white w-full max-w-xs"
          />
        </form>
      </div>
    </dialog>
  );
};

export default BookingModal;
