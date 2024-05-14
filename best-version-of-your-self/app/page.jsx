

import HabitCard from "@/components/HabitCard";
import Login from "@/components/Login";


const Home = () => {
  return (
    <div className="flex justify-center md:w-4/6 p-2 md:p-0">
      <div className="">
        <HabitCard />
      </div>
      <div className="hidden md:block fixed right-1 md:w-2/6">
        <Login />
      </div>
    </div>
  )
}

export default Home