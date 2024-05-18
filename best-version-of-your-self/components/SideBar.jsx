"use client"
import { MantineProvider, ScrollArea, Text } from "@mantine/core"
import Image from "next/image"

const SideBarCards = ({ icon, title, desc }) => {
  return (
    <div className="flex py-3 px-2  mb-1 shadow-md bg-gray-200 hover:text-white hover:bg-green-800 cursor-pointer">
      <Image
        src={icon}
        alt="Prmptopia Logo"
        width={50}
        height={50}
        className="object-contain rounded-full h-12"
      />
      <div className="p-2 w-full">
        <p className="font-semibold text-lg">{title}</p>
        <span className="text-gray-400 text-sm">
          <Text lineClamp={1}>
            {desc}
          </Text>
        </span>
      </div>
    </div>
  )
}

const SideBar = () => {
  return (
    <MantineProvider>
      <ScrollArea className="bg-gray-200">
        <div className="fullscreen">
          <SideBarCards icon="/images/gigachad.jpg" title='Gigachad Community' desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, corporis!" />
          <SideBarCards icon="/images/gigachad.jpg" title='Gigachad Community' desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, corporis!" />
        </div>

      </ScrollArea>
    </MantineProvider>
  )
}

export default SideBar