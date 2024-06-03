import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../public/baseUrl";

const AddDoctors = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { data: services, isLoading } = useQuery("services", () =>
    fetch(`${baseUrl}/services`).then((res) => res.json())
  );
  const imageBbApiKey = "54819920605e585c5fd38adc008fa563";

  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageBbApiKey}`;
    fetch(url, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: img,
          };
          fetch(`${baseUrl}/doctor`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserResult) => {
              if (inserResult.insertedId) {
                toast.success("Doctor inserted successfully");
                reset();
                navigate("/dashboard/manageDoctor");
              } else {
                toast.error("Faild to add the Doctor");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      {" "}
      <h2 className="text-2xl">Add a new doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="name"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          <div className="label">
            {errors.name?.type === "required" && (
              <p role="alert text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
                message: "Provide a valid email address",
              },
            })}
          />
          <div className="label">
            {errors.email?.type === "required" && (
              <p role="alert text-red-500">{errors.email.message}</p>
            )}
            {errors.email?.type === "pattern" && (
              <p role="alert text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Specialty</span>
          </div>
          <select {...register("specialty")} className="select select-bordered">
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <div className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Image</span>
          </div>
          <input
            type="file"
            className="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: {
                value: true,
                message: "Image is required",
              },
            })}
          />
          <div className="label">
            {errors.image?.type === "required" && (
              <p role="alert text-red-500">{errors.image.message}</p>
            )}
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-neutral w-full max-w-xs text-white"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AddDoctors;
