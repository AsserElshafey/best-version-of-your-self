import { HashtagIcon, HeartIcon, NewspaperIcon, CalendarDaysIcon, Cog8ToothIcon } from "@heroicons/react/24/solid"
import { ClockIcon } from "@heroicons/react/24/outline"
import { MantineProvider, Avatar, Chip } from "@mantine/core"


const HabitCard = () => {
  return (
    <MantineProvider>
      <div class="rounded-lg border shadow-md w-full max-w-md md:max-w-lg mb-5 bg-white">
        <div className='p-4'>
          <div className="flex-start gap-1 h-10">
            <HashtagIcon className="h-10 w-8" /><p className='font-extrabold text-3xl'>Exercise</p>
          </div>
          <div className="mt-6">
            <div className="flex-start ml-2">
              <NewspaperIcon className="h-7 w-5" /><p className='ml-2 text-xl font-semibold'>Details:</p>
            </div>
            <p className='ml-6 mt-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde at nisi obcaecati minus aperiam. Neque, ut!
            </p>
          </div>
          <div className="mt-4">
            <div className="flex-start ml-2">
              <HeartIcon className="h-7 w-5" /><p className='ml-2 text-xl font-semibold'>Motivation:</p>
            </div>
            <p className='ml-4 mt-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde at nisi obcaecati minus aperiam. Neque, ut!
            </p>
          </div>
          <div className="mt-4">
            <div className="flex-start ml-2">
              <Cog8ToothIcon className="h-7 w-7" /><p className='ml-2 text-xl font-semibold'>Frequency:</p>
            </div>
            <div className="grid grid-cols-2 gap-4 ml-4 mt-4">
              <div className="flex-center gap-2">
                <CalendarDaysIcon className="h-8 w-7" /><p className="font-semibold"><span className="text-lg">3</span> Days per Week</p>
              </div>
              <div className="flex-center gap-2">
                <ClockIcon className="h-8 w-8" /><p className="font-semibold">60 Mins</p>
              </div>
            </div>
          </div>
          <div className="flex-between mt-4 p-2">
            <Avatar.Group>
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar src="image.png" />
              <Avatar>+5</Avatar>
            </Avatar.Group>
            <Chip defaultChecked color="green" size="md" radius="md">Done</Chip>
          </div>
        </div>
      </div>
    </MantineProvider>
  )
}

export default HabitCard