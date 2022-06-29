import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <form
        action="#"
        className="flex flex-col gap-4 p-20 rounded-xl bg-white shadow-lg "
      >
        <label className="text-2xl text-left">Sign Up</label>
        <label htmlFor="email" className="flex flex-col gap-2 ">
          Email
          <input
            type="text"
            placeholder="e.g example@email.com"
            required
            id="email"
            className="p-2 px-4 rounded-xl border shadow"
          />
        </label>
        <label htmlFor="username" className="flex flex-col gap-2 ">
          Username
          <input
            type="text"
            placeholder="e.g example123"
            required
            id="username"
            className="p-2 px-4 rounded-xl border shadow"
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-2 ">
          Password
          <input
            type="password"
            placeholder="************"
            required
            id="username"
            className="p-2 px-4 rounded-xl border shadow"
          />
        </label>
        <button className="bg-blue-500 rounded-xl p-2 px-4 text-white">
          Login
        </button>
        <p className="text-slate-600 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
