"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { axiosPublic } from "@/api/axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const res = await axiosPublic.post("/users/sign-up", {
          username,
          password,
          name,
          email,
        });
        console.log(res);
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        router.push("/login"); // Redirect to /login route
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    },
    [username, password, name, email, router]
  );

  return (
    <div className="relative w-full max-w-md border border-solid p-8 rounded-2xl shadow-lg bg-white">
      <LoadingOverlay
        visible={loading}
        overlayProps={{ blur: 2 }}
        loaderProps={{ color: "primary", variant: "oval" }}
      />

      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold text-primary-dark mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 text-center">
          Join now and start your journey to a better life
        </p>
      </div>

      <TextInput
        className="mb-4"
        size="md"
        radius="md"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
      />

      <TextInput
        className="mb-4"
        size="md"
        radius="md"
        label="Username"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        className="mb-4"
        size="md"
        radius="md"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        className="mb-4"
        size="md"
        radius="md"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
      />

      <PasswordInput
        className="mb-6"
        size="md"
        radius="md"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
      />

      <Button
        fullWidth
        size="md"
        radius="md"
        onClick={handleSubmit}
        variant="filled"
        className="bg-primary-dark hover:bg-primary-dark/80 text-white transition-colors"
      >
        Sign Up
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
