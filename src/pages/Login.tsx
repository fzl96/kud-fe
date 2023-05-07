import { BiUser, BiLock } from "react-icons/bi";
import { useState, useEffect } from "react";
import { login } from "../api/auth";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import jwt_decode from "jwt-decode";
import { translate } from "../utils/translate";
import { HiArrowSmRight } from "react-icons/hi";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await login(credentials);
      const user: any = jwt_decode(response.accessToken);
      setAuth({
        accessToken: response.accessToken,
        user: user,
      });
      const firstPage = user.role.permissions.sort((a: string, b: string) =>
        a.localeCompare(b)
      )[0];
      localStorage.setItem("isAuth", "true");
      if (firstPage.toLowerCase() === "dashboard") {
        navigate("/");
        return;
      }
      setLoading(false);
      navigate(`/${translate(firstPage.toLowerCase())}`);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error);
        console.log(err.response.data);
        setLoading(false);
        return;
      }
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#ebedee] flex flex-col items-center justify-center">
      <div className="sm:w-[30rem] h-[30rem] bg-white rounded-2xl shadow border-2 p-7 flex flex-col gap-5 justify-center">
        <div className="text-center">
          <h1>Login</h1>
        </div>
        <form className="flex flex-col w-full gap-5 " onSubmit={handleSubmit}>
          <div className="flex flex-col px-5 py-3  rounded bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 ">
            <label
              htmlFor="username"
              className={`text-sm font-semibold flex items-center gap-2 after:content-['*'] after:text-red-500`}
            >
              <span className="text-xs">
                <BiUser />
              </span>
              Username
            </label>
            <input
              required
              value={username}
              type="text"
              className="bg-transparent outline-none transition-all duration-150 text-black"
              onChange={(e) => {
                setError("");
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col px-5 py-3  rounded bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 ">
            <label
              htmlFor="password"
              className={`text-sm font-semibold flex items-center gap-2 after:content-['*'] after:text-red-500`}
            >
              <span className="text-xs">
                <BiLock />
              </span>
              Password
            </label>
            <input
              required
              value={password}
              type="password"
              className="bg-transparent outline-none transition-all duration-150 text-black"
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            disabled={loading}
            className={`group px-5 flex items-center w-full justify-center py-5  text-white rounded-md ${
              !loading ? "hover:bg-[#33363a] bg-[#27272b]" : "bg-gray-500"
            }`}
          >
            {loading ? (
              <ClipLoader color="white" size={23} />
            ) : (
              <>
                <span>Sign in</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform duration-150">
                  <HiArrowSmRight />
                </span>
              </>
            )}
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm ">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
