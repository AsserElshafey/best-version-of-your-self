"use client"
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("http://localhost:8000/api/v1/users/signup/", { username, password, firstName, lastName });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      setUsername("");
      setPassword("");
      setFirstName("")
      setLastName("")
      router.push('/user'); // Redirect to /user route
    } catch (error) {
      alert(error);
    }
  }, [username, password, firstName, lastName, router]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-1/2 max-w-sm border border-solid p-10 rounded-xl shadow-xl bg-zinc-100">
          <div className="text-center md:text-left mb-10">
            <label className="mr-1 font-bold text-xl font">Sign Up</label>
          </div>
          <div className="flex mb-4">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 mr-1"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 ml-1"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 mb-4"
            type="password"
            placeholder="Confirm Password"
          />
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded text-sm tracking-wider"
              type="submit"
              onClick={handleSubmit}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
      <div className="flex fixed bg-green-700 bottom-10 right-5 p-3 rounded-full">
        <Link href="/" className="hover:scale-110 transition-all">
          <HomeIcon className="w-6 h-6 text-white" />
        </Link>
      </div>
    </>
  );
}

export default SignUpPage;
