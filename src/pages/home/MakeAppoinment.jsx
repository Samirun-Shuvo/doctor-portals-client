import doctor from "../../assets/images/doctor.png";
import appointment from "../../assets/images/appointment.png";
import PrimaryButton from "../shared/PrimaryButton";
const MakeAppoinment = () => {
  return (
    <section
      style={{ background: `url(${appointment})` }}
      className="flex justify-center items-center"
    >
      <div className="flex-1 hidden lg:block">
        <img className="mt-[-100px]" src={doctor} alt="" />
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-xl text-primary font-bold py-4">Appointment</h3>
        <h2 className="text-3xl text-white py-4">Make an Appointment Today</h2>
        <p className="text-white py-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          aspernatur, dolores vero hic debitis eos. Cupiditate assumenda tempore
          temporibus porro deleniti facilis suscipit laudantium. Praesentium
          distinctio a, tenetur quaerat labore reprehenderit accusamus beatae
          illum, vel quasi nobis eaque, illo harum.
        </p>
        <PrimaryButton> Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default MakeAppoinment;
