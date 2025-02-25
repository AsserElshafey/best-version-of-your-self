"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MantineProvider,
  TextInput,
  PasswordInput,
  LoadingOverlay,
} from "@mantine/core";
import {axiosPublic} from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
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
        const response = await axiosPublic.post(
          "/auth/login",
          JSON.stringify({ identifier, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: false,
          }
        );


        const accessToken = response?.data?.accessToken;
        setAuth({ identifier, password, accessToken });
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", response.data.user.id);
        setUsername("");
        setPassword("");
        setLoading(false);

        // Redirect to user page
        router.push("/user");
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
        <LoadingOverlay
          visible={loading}
          overlayBlur={2}
          className="rounded-xl"
          loaderProps={{ color: "green" }}
        />
        <div className="flex gap-2 text-center md:text-left mb-10">
          <label className="mr-1 font-semibold font-inter w-full text-center text-2xl">Log into your account</label>
        </div>
        <TextInput
          className="py-3"
          size="md"
          radius="md"
          placeholder="Username"
          value={identifier}
          onChange={(e) => setUsername(e.target.value)}
          error={usernameError}
        />
        <PasswordInput
          className="w-full py-3"
          size="md"
          radius="md"
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
            className="text-primary-dark hover:text-primary hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-primary-dark font-semibold font-inter hover:bg-primary px-4 py-2 text-white uppercase rounded text-xs tracking-wider w-full sm:w-auto"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary-dark font-semibold underline-offset-4 underline hover:text-primary"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </MantineProvider>
  );
};

export default Login;
