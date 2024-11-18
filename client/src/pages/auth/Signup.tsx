import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextBox from "../../components/comman/TextBox";
import Button from "../../components/comman/Button";
import { UserGroupIcon } from "@heroicons/react/16/solid";

type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  // Initialize the form with useForm hook and TypeScript types
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  // Handle form submission
  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(data); // Replace this with your API submission logic
    toast.success("Signup successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <UserGroupIcon className="w-16 h-16 text-blue-500 mx-auto" />
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <TextBox id="username" type="text" label="Username" error={errors.username} register={register("username", { required: "Username is required" })} />

          {/* Email Field */}
          <TextBox
            id="email"
            type="email"
            label="Email"
            error={errors.email}
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format!",
              },
            })}
          />

          {/* Password Field */}
          <TextBox
            id="password"
            type="text"
            label="Password"
            error={errors.password}
            register={register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />

          {/* Submit Button */}
          <div className="mb-4">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
