/* eslint-disable react/prop-types */
const Service = ({ service, setTreatment }) => {
  const { name, slots, price } = service;

  const handleBookingClick = async (service) => {
    await setTreatment(service);
    document.getElementById("booking-modal").showModal();
  };
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title justify-center text-secondary">{name}</h2>
        <p>
          {slots.length ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-500">Try Another Date</span>
          )}
        </p>
        <p>
          {slots.length} {slots.length ? "spaces" : "space"} available
        </p>
        <p>
          <small>Price : ${price}</small>
        </p>
        <div className="card-actions justify-center">
          <button
            disabled={slots.length === 0}
            className="btn btn-secondary text-white"
            onClick={() => handleBookingClick(service)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
