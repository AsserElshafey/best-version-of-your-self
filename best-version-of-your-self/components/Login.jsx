"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MantineProvider,
  TextInput,
  PasswordInput,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { axiosPublic } from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const { setAuth, logout } = useAuth();
  const [identifier, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const response = await axiosPublic.post(
          "/auth/login",
          JSON.stringify({ identifier, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        const userId = response?.data?.user?.id;

        if (!accessToken) {
          throw new Error("No access token returned from server");
        }

        // Store auth data and update context
        setAuth({
          accessToken,
          refreshToken,
          userId,
          user: response.data.user,
        });

        // Clear form fields
        setUsername("");
        setPassword("");

        // Redirect to user page
        router.push("/user");
      } catch (error) {
        // Error handling
        setError(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      } finally {
        setLoading(false);
      }
    },
    [identifier, password, router, setAuth]
  );

  // Example modification for logout function
  const handleLogout = () => {
    // Use the logout function from auth context instead of directly manipulating localStorage
    logout();
  };

  return (
    <MantineProvider>
      <div className="relative sm:max-w-sm md:max-w-md w-full border border-solid p-10 rounded-xl shadow-xl bg-zinc-100 mt-10 sm:mt-20 lg:mt-0">
        <LoadingOverlay
          visible={loading}
          overlayProps={{
            blur: 2,
            opacity: 0.5,
          }}
          className="rounded-xl"
          loaderProps={{ color: "grey" }}
        />
        <div className="flex gap-2 text-center md:text-left mb-10">
          <label className="mr-1 font-bold w-full text-center text-2xl">
            Log into your account
          </label>
        </div>

        {error && (
          <Alert
            icon={<AlertTriangle size={16} />}
            title="Authentication Error"
            color="red"
            className="mb-4"
            withCloseButton
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <TextInput
          className="py-3"
          size="md"
          radius="md"
          placeholder="Username"
          value={identifier}
          onChange={(e) => setUsername(e.target.value)}
          error={error ? " " : ""}
          required
        />
        <PasswordInput
          className="w-full py-3"
          size="md"
          radius="md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error ? " " : ""}
          required
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
            disabled={loading}
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
