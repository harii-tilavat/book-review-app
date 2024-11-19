import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextBox from "../../components/comman/TextBox";
import Button from "../../components/comman/Button";
import { LockClosedIcon } from "@heroicons/react/16/solid";
import { useTheme } from "../../context/ThemeContext";

interface LoginForm {
  email: string;
  password: string;
  testPassword: string;
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    toast.success("Login successful!");
    navigate("/");
    console.log("LOGIN : ", data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <LockClosedIcon className="w-12 h-12 text-blue-500 mx-auto" />
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-100 mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email Field */}
          <TextBox id="email" label="Email" type="text" register={register("email", { required: "Email is required!" })} error={errors.email} />

          {/* Password */}
          <TextBox id="password" label="Password" type="password" register={register("password", { required: "Password is required!" })} error={errors.password} />

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
