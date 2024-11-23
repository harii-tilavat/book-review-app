import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextBox from "../../components/comman/TextBox";
import Button from "../../components/comman/Button";
import { LockClosedIcon } from "@heroicons/react/16/solid";
import { UserLoginModel } from "../../models/UserModel";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import authApi from "../../api/authApi";

// const toastOptions: ToastOptions = {
//   position: "top-right",
//   autoClose: 1000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginModel>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (userData: UserLoginModel) => {
    try {
      const { data } = await authApi.login(userData);
      const { user, token } = data;
      // console.log("RESPONSE : ", response);
      loginUser(user, token);

      toast.success("Login successful!");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error((error && error.message) || "Authentication failed! Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <LockClosedIcon className="w-12 h-12 text-blue-600 mx-auto" />
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-100 mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <TextBox
            id="email"
            label="Email"
            type="text"
            register={register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format!",
              },
            })}
            error={errors.email}
          />

          {/* Password */}
          <TextBox
            id="password"
            label="Password"
            type="password"
            register={register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password}
          />

          {/* Submit Button */}
          <div className="mb-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mb-4">
            <p className="mt-4 text-center text-sm dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700">
                Signup here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
