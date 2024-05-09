import InfoCard from "./InfoCard";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";

const Info = () => {
  const cardDatas = [
    {
      bgClass: "bg-gradient-to-r from-secondary to-primary",
      cardTitle: "Opening Hours",
      img: clock,
    },
    {
      bgClass: "bg-accent",
      cardTitle: "Our Locations",
      img: marker,
    },
    {
      bgClass: "bg-gradient-to-r from-secondary to-primary",
      cardTitle: "Contact Us",
      img: phone,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {cardDatas.map((cardData, i) => (
        <InfoCard key={i} cardData={cardData}></InfoCard>
      ))}
    </div>
  );
};

export default Info;
