"use client";
import { MantineProvider, ScrollArea, Text, Input } from "@mantine/core";
import Image from "next/image";
import api from "../utils/api";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import "@mantine/core/styles.css";

const SideBarCards = ({ icon, title, desc, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`flex py-3 px-2 mb-1 shadow-md bg-gray-100 cursor-pointer ${isSelected ? "bg-green-800 text-white" : "hover:bg-green-800 hover:text-white"
        }`}
    >
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
          <Text lineClamp={1}>{desc}</Text>
        </span>
      </div>
    </div>
  );
};

const SideBar = ({ onSelectCommunity, selectedCommunity }) => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchUserCommunities();
  }, []);

  const fetchUserCommunities = async () => {
    try {
      const response = await api.get("api/v1/user/communities");
      const communityIds = response.data.communities;

      const communityPromises = communityIds.map(async (communityId) => {
        const communityResponse = await api.get(`api/v1/communities/${communityId}`);
        return communityResponse.data;
      });
      const communitiesData = await Promise.all(communityPromises);
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("error");
    }
  };

  return (
    <MantineProvider>

      <ScrollArea className="bg-gray-200 fullscreen">
        <div className="flex-center gap-5 fixed w-1/3 search-height bg-gray-100 border-b shadow-xl">
          <Input
            className="w-4/5 shadow-md"
            size="md"
            rightSection={<MagnifyingGlassIcon className="h-6 w-6" />}
            placeholder="Search Communities"
          />
          <AdjustmentsHorizontalIcon className="h-7 w-7" />
        </div>
        <hr class="border-2 border-gray-500 search-hr-mt  mb-1" />
        <hr className="" />
        {communities.map((community) => (
          <SideBarCards
            key={community.id}
            icon="/images/gigachad.jpg"
            title={community.name}
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, corporis!"
            onClick={() => onSelectCommunity(community)}
            isSelected={selectedCommunity?.id === community.id}
          />
        ))}
      </ScrollArea>
    </MantineProvider>
  );
};

export default SideBar;
