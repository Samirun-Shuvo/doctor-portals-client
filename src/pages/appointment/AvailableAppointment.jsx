/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { useState } from "react";
import Service from "./Service";
import BookingModal from "./BookingModal";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import { baseUrl } from "../../../public/baseUrl";

const AvailableAppointment = ({ date }) => {
  // const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const formattedDate = format(date, "PP");

  const fetchPosts = async () => {
    const response = await fetch(
      `${baseUrl}/available?date=${formattedDate}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery(["available", formattedDate], fetchPosts);

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
      <h4 className="text-center text-xl text-secondary">
        Available Appointments on {format(date, "PP")}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></Service>
        ))}
      </div>
      {treatment && (
        <BookingModal
          date={date}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AvailableAppointment;
