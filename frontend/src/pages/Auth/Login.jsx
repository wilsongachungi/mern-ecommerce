import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Navigation from "./Navigation";
import Loader from "../../components/loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem">
          <h1 className="text-2xl font-semibold mb-4 text-white">Sign In</h1>
          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Passoword
              </label>

              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In.." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <div className="text-white">
              New Customer ? {""}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        <img
          src="data:image/png;base64,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"
          alt="Login Illustration"
          className="h-[30rem] w-[40%] xl:block md:hidden sm:hidden round:lg mt-2 mb-2"
        />
      </section>
    </div>
  );
};

export default Login;
