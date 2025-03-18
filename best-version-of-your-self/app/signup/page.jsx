"use client";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";
import { ScrollArea } from "@mantine/core";
import Background from "@/components/Background";
import SignUp from "@/components/auth/SignUp";

export default function SignUpPage() {
  return (
    <Background>
      <ScrollArea className="h-svh">
        <div className="flex justify-center items-center h-screen">
          <SignUp />
        </div>

        <div className="flex fixed bg-primary-dark bottom-10 right-5 p-3 rounded-full shadow-md hover:bg-primary-dark/80 transition-all">
          <Link href="/" className="hover:scale-110 transition-all">
            <HomeIcon className="w-6 h-6 text-white" />
          </Link>
        </div>
      </ScrollArea>
    </Background>
  );
}
