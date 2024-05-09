// eslint-disable-next-line react/prop-types
const InfoCard = ({cardData}) => {
    // eslint-disable-next-line react/prop-types
    const {cardTitle,bgClass,img} = cardData
  return (
    <div className={`card lg:card-side shadow-xl ${bgClass}`}>
      <figure className="pl-5 py-5">
        <img
          src={img}
          alt="Album"
        />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{cardTitle}</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
      </div>
    </div>
  );
};

export default InfoCard;
