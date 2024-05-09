import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import useToken from "../../hooks/useToken";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [token] = useToken(gUser || user);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";

  
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  if (loading || gLoading) {
    return <Loading />;
  }
  let signInError;
  if (error || gError) {
    signInError = (
      <p className="text-red-500 my-2">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data?.email, data?.password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full max-w-xs">
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
            </label>

            <label className="form-control w-full max-w-xs">
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
            </label>
            {signInError}

            <input
              type="submit"
              className="btn btn-neutral w-full max-w-xs text-white"
              value="Login"
            />
          </form>
          <p>
            <small>
              New to doctor portals ?{" "}
              <Link to="/signup" className="text-blue-700">
                Create an account
              </Link>
            </small>
          </p>{" "}
          {/* Ensure the correct path */}
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

export default Login;
