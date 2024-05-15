"use client"
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("http://localhost:8000/api/v1/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      setUsername("");
      setPassword("");
      router.push('/user'); // Redirect to /user route
    } catch (error) {
      alert(error);
    }
  }, [username, password, router]);

  return (
    <div className="max-w-sm border border-solid p-10 rounded-xl shadow-xl bg-zinc-100">
      <div className="text-center md:text-left mb-10">
        <label className="mr-1 font-bold text-xl font">Login Now !</label>
      </div>
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        type="text"
        placeholder="Email Address"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-4 flex justify-between font-semibold text-sm">
        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
          <input className="mr-1" type="checkbox" />
          <span>Remember Me</span>
        </label>
        <a
          className="text-green-600 hover:text-green-700 hover:underline hover:underline-offset-4"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center md:text-left">
        <button
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don&apos;t have an account?{" "}
        <Link
          className="text-red-600 hover:underline hover:underline-offset-4"
          href="/signup"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login