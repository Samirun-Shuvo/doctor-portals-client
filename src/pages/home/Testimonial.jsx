import quote from "../../assets/icons/quote.svg";
import people1 from "../../assets/images/people1.png";
import people2 from "../../assets/images/people2.png";
import people3 from "../../assets/images/people3.png";
import Review from "./Review";
const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      location: "Calfornia",
      review: "",
      img: people1,
    },
    {
      _id: 1,
      name: "Montel Doe",
      location: "Calfornia",
      review: "",
      img: people2,
    },
    {
      _id: 1,
      name: "Canti Hyk",
      location: "Calfornia",
      review: "",
      img: people3,
    },
  ];
  return (
    <section className="my-24">
      <div className="flex justify-between">
        <div className="px-5">
          <h4 className="text-xl text-primary font-bold">Testimonial</h4>
          <h2 className="text-3xl">What our Patients say</h2>
        </div>
        <div>
          <img className="w-24 lg:w-48" src={quote} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
