
import Link from "next/link"
import Image from "next/image"
import HabitCard from "@/components/HabitCard";
import Login from "@/components/Login";
import CommunityCard from "@/components/CommunityCard";


const Home = () => {
  return (
    <>
      <div className="flex w-full bg-gray-900 pl-3 py-3 border-b-2 border-green-500 mb-2 fixed top-0">
        <Link href="/" className="flex gap-2 flex-center ">
          <Image
            src='/images/gigachad.jpg'
            alt="Prmptopia Logo"
            width={55}
            height={55}
            className="object-contain rounded-full"
          />
          <p className="logo_text">BVOYS</p>
        </Link>
      </div>
      <div className="flex justify-center md:w-4/6 px-5 md:p-0">
        <div className="mt-24">
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />
          <CommunityCard />

        </div>
        <div className="hidden md:block fixed right-1 md:w-2/6 mt-36">
          <Login />
        </div>
      </div>
      <div className="flex justify-between md:hidden w-full bg-green-800 py-2 px-4 fixed bottom-6 bg-opacity-90 rounded-t-xl">
        <p className="text-white tet font-semibold">
          Are you ready to sign in ?
        </p>
        <Link
          type="button"
          href='/login'
          className="green_btn"
        >
          Sign In
        </Link>
      </div>
    </>
  )
}

export default Home