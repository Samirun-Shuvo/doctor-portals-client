import appointment from "../../assets/images/appointment.png";
import PrimaryButton from "../shared/PrimaryButton";

const Contact = () => {
  return (
    <section
      style={{ background: `url(${appointment})` }}
      className="flex justify-center items-center my-24"
    >
      <div className="py-8">
        <div className="text-center py-4 text-primary ">
          <h3 className="font-bold py-2">Contact Us</h3>
          <h2 className="text-3xl text-white">Stay Connect With Us</h2>
        </div>
        <form>
          <div className="my-1">
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="my-1">
            <input
              type="text"
              placeholder="Contact Number"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="my-1">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <PrimaryButton>submit</PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
