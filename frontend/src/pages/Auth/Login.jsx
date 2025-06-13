import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Navigation from "./Navigation";

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

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap bg-black">
        <div className="mr-[4rem] mt-[5rem">
          <h1 className="text-2xl font-semibold mb-4 text-white">Sign In</h1>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button disabled="{isLoading}" type="submit" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">{isLoading ? "Signing In.." : "Sign In"}</button>
          {isLoading && <Loader/>}
        </div>
      </section>
    </div>
  );
};

export default Login;
