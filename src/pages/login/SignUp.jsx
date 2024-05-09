import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../shared/Loading";
import useToken from "../../hooks/useToken";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [token] = useToken(gUser || user);
  const navigate = useNavigate();

  if (loading || gLoading || updating) {
    return <Loading />;
  }

  let signInError;
  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500 my-2">
        <small>
          {error?.message || gError?.message || updateError?.message}
        </small>
      </p>
    );
  }

  if (token) {
    navigate("/appointment");
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data?.email, data?.password);
    await updateProfile({ displayName: data.name });
    console.log("update done");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">Sign Up</h2>
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

            <div className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters or longer",
                  },
                })}
              />
              <div className="label">
                {errors.password?.type === "required" && (
                  <p role="alert text-red-500">{errors.password.message}</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {signInError}

            <input
              type="submit"
              className="btn btn-neutral w-full max-w-xs text-white"
              value="Sign Up"
            />
          </form>
          <p>
            <small>
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-700">
                Please Login
              </Link>
            </small>
          </p>{" "}
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
