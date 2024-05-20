"use client";
import { MantineProvider, ScrollArea, Text } from "@mantine/core";
import Image from "next/image";
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@mantine/core/styles.css";

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
          <Text lineClamp={1}>{desc}</Text>
        </span>
      </div>
    </div>
  );
};

const SideBar = () => {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchUserCommunities();
  }, []);

  const fetchUserCommunities = async () => {
    try {
      const response = await api.get("api/v1/user/communities");
      const communityIds = response.data.communities; // Assuming response.data is an array of community IDs

      const communityPromises = communityIds.map(async (communityId) => {
        const communityResponse = await api.get(
          `api/v1/communities/${communityId}`
        );
        return communityResponse.data;
      });
      const communitiesData = await Promise.all(communityPromises);
      setCommunities(communitiesData);
      console.log(communitiesData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("error");
    }
  };
  return (
    <MantineProvider>
      <ScrollArea className="bg-gray-200">
        {communities.map((community) => (
          <SideBarCards
            key={community.id} // Assuming each community object has a unique ID
            icon="/images/gigachad.jpg" // Assuming each community object has an 'icon' property
            title={community.name} // Assuming each community object has a 'title' property
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, corporis!" // Assuming each community object has a 'desc' property
          />
        ))}
      </ScrollArea>
    </MantineProvider>
  );
};

export default SideBar;
