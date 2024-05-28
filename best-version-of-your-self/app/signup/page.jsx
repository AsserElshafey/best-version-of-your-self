"use client";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MantineProvider, TextInput, PasswordInput, Button, LoadingOverlay } from "@mantine/core";
import api from "../../utils/api";
import Background from "@/components/Background";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("api/v1/users/signup/", { username, password, first_name, last_name, email });
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");
      router.push('/login'); // Redirect to /login route
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, [username, password, first_name, last_name, email, router]);

  return (
    <MantineProvider>
      <Background>
        <div className="flex justify-center items-center h-screen">
          <div className="relative md:w-1/2 max-w-sm border border-solid p-10 rounded-xl shadow-xl bg-zinc-100">
            <LoadingOverlay visible={loading} overlayBlur={2} className="rounded-xl" loaderProps={{ color: 'green' }} />
            <div className="flex gap-2 text-center md:text-left mb-10">
              <Image
                src="/images/Logo.ico"
                alt="Prmptopia Logo"
                width={35}
                height={35}
                className="object-contain rounded-full"
              />
              <label className="mr-1 font-bold text-xl font">Sign Up</label>
            </div>
            <div className="flex mb-4 gap-2">
              <TextInput
                size="md"
                radius="lg"
                label="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <TextInput
                size="md"
                radius="lg"
                label="Last Name"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <TextInput
              className="mb-2"
              size="md"
              radius="lg"
              label="User Name"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              className="mb-2"
              size="md"
              radius="lg"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              className="mb-2"
              size="md"
              radius="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <PasswordInput
              className="mb-2"
              size="md"
              radius="lg"
              label="Confirm Password"
              placeholder="Confirm Password"
            />
            <div className="text-center md:text-left">
              <Button
                className="mt-4"
                color="green"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        <div className="flex fixed bg-green-700 bottom-10 right-5 p-3 rounded-full">
          <Link href="/" className="hover:scale-110 transition-all">
            <HomeIcon className="w-6 h-6 text-white" />
          </Link>
        </div>
      </Background>
    </MantineProvider>
  );
}

export default SignUpPage;
