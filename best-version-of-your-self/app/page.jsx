

import HabitCard from "@/components/HabitCard";
import Login from "@/components/Login";


const Home = () => {
  return (
    <div className="flex p-10">
      <div className="lg:flex w-full hidden justify-center gap-40">
        <div className="ml ml-40">
          <HabitCard />
          <HabitCard />
          <HabitCard />
          <HabitCard />
          <HabitCard />
        </div>
        <div className="">
          <Login />
        </div>
      </div>
      <div className="lg:hidden flex w-full justify-center">
        <HabitCard />
      </div>
    </div>
  )
}

export default Home