"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  LoadingOverlay,
  Alert,
  Button,
  Checkbox,
} from "@mantine/core";
import { axiosPublic } from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const response = await axiosPublic.post(
          "/auth/login",
          JSON.stringify({
            identifier: formData.identifier,
            password: formData.password,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const { accessToken, refreshToken, user } = response?.data || {};

        if (!accessToken) {
          throw new Error("No access token returned from server");
        }

        // Store auth data and update context
        setAuth({
          accessToken,
          refreshToken,
          userId: user?.id,
          user,
        });

        // Reset form state
        setFormData({
          identifier: "",
          password: "",
          rememberMe: formData.rememberMe,
        });

        // Redirect to user page
        router.push("/user");
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, router, setAuth]
  );

  return (
    <div className="relative sm:max-w-sm md:max-w-md w-full border border-solid p-10 rounded-xl shadow-xl bg-zinc-100 mt-10 sm:mt-20 lg:mt-0">
      <LoadingOverlay
        visible={loading}
        overlayProps={{
          blur: 2,
          opacity: 0.5,
        }}
        className="rounded-xl"
        loaderProps={{ color: "primary" }}
      />

      <h1 className="text-2xl font-bold text-center mb-10">
        Log into your account
      </h1>

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

      <form onSubmit={handleSubmit}>
        <TextInput
          className="py-3"
          size="md"
          radius="md"
          name="identifier"
          placeholder="Username"
          value={formData.identifier}
          onChange={handleChange}
          error={error ? " " : ""}
          required
        />

        <PasswordInput
          className="w-full py-3"
          size="md"
          radius="md"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={error ? " " : ""}
          required
        />

        <div className="mt-4 flex justify-between font-semibold text-sm">
          <Checkbox
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            label="Remember Me"
            className="text-slate-500"
          />

          <Link
            href="/forgot-password"
            className="text-primary-dark hover:text-primary hover:underline hover:underline-offset-4"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            className="bg-primary-dark hover:bg-primary w-full sm:w-auto"
            disabled={loading}
            fullWidth
          >
            Login
          </Button>
        </div>

        <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary-dark font-semibold underline-offset-4 underline hover:text-primary"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
