import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading";
import StripeWrapper from "./StripeWrapper";
import CheckoutForm from "./CheckoutForm";
import { baseUrl } from "../../../public/baseUrl";

const Payment = () => {
  const { id } = useParams();
  const url = `${baseUrl}/booking/${id}`;
  const { data: appointment, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!appointment) {
    return <div>No appointment found.</div>;
  }

  return (
    <div>
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <p className="text-success font-bold">
            Hello, {appointment.patientName}
          </p>
          <h2 className="card-title">Please Pay for {appointment.treatment}</h2>
          <p>
            Your Appointment :{" "}
            <span className="text-orange-700">{appointment.date}</span>
          </p>
          <p>Please Pay: ${appointment.price}</p>
        </div>
      </div>
      <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <StripeWrapper>
            <CheckoutForm appointment={appointment}/>
          </StripeWrapper>
        </div>
      </div>
    </div>
  );
};

export default Payment;
