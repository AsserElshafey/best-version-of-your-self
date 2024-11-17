"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MantineProvider, TextInput, PasswordInput, LoadingOverlay } from "@mantine/core";
import axiosPublic from "@/app/api/axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";

const Login = () => {
  const [identifier, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setUsernameError("");
      setPasswordError("");
      setLoading(true);

      try {
        const res = await axiosPublic.post("/auth/login", { identifier, password });
        // localStorage.setItem(ACCESS_TOKEN, res.data.access);
        // localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setUsername("");
        setPassword("");
        router.push("/user"); // Redirect to /user route
      } catch (error) {
        if (error) {
          setUsernameError("Wrong username");
          setPasswordError("Wrong password");
        } else {
          alert("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [identifier, password, router]
  );

  return (
    <MantineProvider>
      <div className="relative sm:max-w-sm md:max-w-md w-full border border-solid p-10 rounded-xl shadow-xl bg-zinc-100 mt-10 sm:mt-20 lg:mt-0">
        <LoadingOverlay visible={loading} overlayBlur={2} className="rounded-xl" loaderProps={{ color: 'green' }} />
        <div className="flex gap-2 text-center md:text-left mb-10">
          <Image
            src="/images/Logo.ico"
            alt="Prmptopia Logo"
            width={35}
            height={35}
            className="object-contain rounded-full"
          />
          <label className="mr-1 font-bold text-xl">Login</label>
        </div>
        <TextInput
          className="py-2"
          size="md"
          radius="lg"
          label="Username"
          placeholder="Username"
          value={identifier}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
        />
        <PasswordInput
          className="w-full py-2"
          size="md"
          radius="lg"
          label="Enter Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
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
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider w-full sm:w-auto"
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
    </MantineProvider>
  );
};

export default Login;
