import treatment from "../../assets/images/treatment.png";
import PrimaryButton from "../shared/PrimaryButton";
const Terms = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl my-24">
      <figure>
        <img src={treatment} alt="Movie" className="hidden lg:block" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Exceptional Dental Care, On Your Terms</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quam
          saepe! Eveniet distinctio harum cum totam repudiandae consectetur,
          numquam itaque aspernatur perferendis ab tenetur maiores eum magni non
          quo tempora eos ratione sapiente consequatur nihil veritatis,
        </p>
        <div className="card-actions justify-end">
          <PrimaryButton> Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Terms;
