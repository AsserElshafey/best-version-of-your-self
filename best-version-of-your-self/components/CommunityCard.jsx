import Image from "next/image"
import Link from "next/link"
import { UserGroupIcon } from "@heroicons/react/24/solid"

const CommunityCard = ({ data }) => {
  const { name, description } = data;
  return (
    <div className="max-w-xl rounded-xl mb-4 shadow-md bg-white">
      <div className="flex justify-between items-center rounded-t-md py-2 px-3 bg-[#383838] border-b-2 border-green-600">
        <div className="flex gap-2 items-center">
          <Image
            src='/images/gigachad.jpg'
            alt="Prmptopia Logo"
            width={55}
            height={55}
            className="object-contain rounded-full"
          />
          <p className="font-semibold font-satoshi text-xl text-gray-200">{name}</p>
        </div>
        <div className="flex gap-2">
          <UserGroupIcon className="w-6 h-6 text-white" />
          <p className="text-white font-semibold">
            24
          </p>
        </div>
      </div>
      <div className="py-4 px-6">
        <p className="font-bold pl-2 text-lg mb-2">About Community:</p>
        <p className="pl-10 pr-3">{description}</p>
      </div>
      <div className="py-4 px-6">
        <p className="font-bold pl-2 text-lg">Top habits:</p>

        {/* habits div */}
        <div className="h-72 overflow-y-scroll hide-scrollbar border-t-2 border-green-600 mt-2">
          <div className="px-4 py-2 mt-2 border border-solid rounded-lg shadow-sm">
            <div className="flex gap-2 items-center">
              <Image
                src='/images/gigachad.jpg'
                alt="Prmptopia Logo"
                width={45}
                height={45}
                className="object-contain rounded-full"
              />
              <p className="font-satoshi font-semibold text-lg">Daily exercise</p>
            </div>
            <p className="pl-14">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad a necessitatibus non tempora vitae amet.
            </p>
          </div>
          <div className="px-4 py-2 mt-2 border border-solid rounded-lg shadow-sm">
            <div className="flex gap-2 items-center">
              <Image
                src='/images/gigachad.jpg'
                alt="Prmptopia Logo"
                width={45}
                height={45}
                className="object-contain rounded-full"
              />
              <p className="font-satoshi font-semibold text-lg">Daily exercise</p>
            </div>
            <p className="pl-14">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad a necessitatibus non tempora vitae amet.
            </p>
          </div>
          <div className="px-4 py-2 mt-2 border border-solid rounded-lg shadow-sm">
            <div className="flex gap-2 items-center">
              <Image
                src='/images/gigachad.jpg'
                alt="Prmptopia Logo"
                width={45}
                height={45}
                className="object-contain rounded-full"
              />
              <p className="font-satoshi font-semibold text-lg">Daily exercise</p>
            </div>
            <p className="pl-14">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad a necessitatibus non tempora vitae amet.
            </p>
          </div>
          <div className="px-4 py-2 mt-2 border border-solid rounded-lg shadow-sm">
            <div className="flex gap-2 items-center">
              <Image
                src='/images/gigachad.jpg'
                alt="Prmptopia Logo"
                width={45}
                height={45}
                className="object-contain rounded-full"
              />
              <p className="font-satoshi font-semibold text-lg">Daily exercise</p>
            </div>
            <p className="pl-14">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad a necessitatibus non tempora vitae amet.
            </p>
          </div>
        </div>

      </div>

      <div className="flex justify-center py-2 px-6 bg-[#383838] rounded-b-md">
        <Link
          href='/'
          className="bg-green-600 py-1 rounded-xl w-2/3 text-center transition-all hover:scale-105"
        >
          <p className="text-white font-semibold">
            More Details !
          </p>
        </Link>
      </div>
    </div>
  )
}

export default CommunityCard