import { format } from "date-fns";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

/* eslint-disable react/prop-types */
const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
  const { _id, name, slots, price } = treatment;
  const [user] = useAuthState(auth);
  const formatedDate = format(date, "PP");

  const sendAppointmentEmail = (booking) => {
    emailjs
      .send("service_jb96gwt", "template_6pvbn0t", booking, "hxJ6ABoPK03KoCgzs")
      .then(
        () => {
          toast.success("An apponitment email send successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formatedDate,
      slot,
      price,
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
          sendAppointmentEmail({
            ...booking,
            name: user.displayName,
            email: user.email,
            subject: `Your appointment for ${booking.treatment} is on ${formatedDate} at ${slot} is Confirmed.`,
            message: `Your appointment for ${booking.treatment} is Confirmed. Looking forward to seeing you on ${formatedDate} at ${slot}.`,
          });
        } else {
          toast.error(
            `Already have an appointment on ${data?.booking?.date} at ${data?.booking?.slot}`
          );
        }
        // For closing the modal
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
          <div>
            <form method="dialog">
              <button
                className="btn font-bold"
                onClick={() => setTreatment(null)}
              >
                X
              </button>
            </form>
          </div>
        </div>
        <form
          onSubmit={handleBooking}
          className="grid grid-cols-1 gap-5 justify-items-center my-5"
        >
          <input
            type="text"
            value={formatedDate}
            disabled
            className="input input-bordered w-full max-w-xs"
          />
          <select
            name="slot"
            className="select select-bordered w-full max-w-xs"
            required
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
            required
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
