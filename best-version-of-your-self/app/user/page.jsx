"use client";
import Nav from "@/components/Nav";
import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import Community from "@/components/Community";
import axiosPrivate from "@/app/api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const User = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communities, setCommunities] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const addCommunity = (newCommunity) => {
    setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
  };

  const deleteCommunity = async (communityId) => {
    try {
      await api.delete(`api/v1/communities/${communityId}`);
      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community.id !== communityId)
      );
      if (selectedCommunity && selectedCommunity.id === communityId) {
        setSelectedCommunity(null);
      }
    } catch (error) {
      console.error("Error deleting community:", error);
      alert("error deleting community");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchUserCommunities(userId);
  }, []);

  const fetchUserCommunities = async (userId) => {
    try {
      const response = await axiosPrivate.get(`/communities/users/${userId}`);
      console.log(response.data.message);
      // const communityIds = response.data.communities;

      // const communityPromises = communityIds.map(async (communityId) => {
      //   const communityResponse = await axiosPrivate.get(
      //     `/communities/${communityId}`
      //   );
      //   return communityResponse.data;
      // });
      // const communitiesData = await Promise.all(communityPromises);
      setCommunities(response.data.communities);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("error");
    }
  };

  return (
    <div>
      <Nav addCommunity={addCommunity} />
      <div className="flex transition-all duration-300">
        <div
          className={`fixed inset-0 mt-81px md:mt-0 md:relative md:w-1/3 ${
            selectedCommunity
              ? "translate-x-[-100%] md:translate-x-0"
              : "translate-x-0"
          } transition-transform duration-300 ease-in-out`}
        >
          <SideBar
            onSelectCommunity={setSelectedCommunity}
            selectedCommunity={selectedCommunity}
            communities={communities}
          />
        </div>
        <div
          className={`w-full md:w-2/3 ml-0 md:ml-auto ${
            !selectedCommunity ? "hidden md:block" : "block"
          } transition-transform duration-300 ease-in-out`}
        >
          {!selectedCommunity ? (
            <div className="flex-center fullscreen">
              Select a community to view its details
            </div>
          ) : (
            <Community
              community={selectedCommunity}
              onBack={() => setSelectedCommunity(null)}
              deleteCommunity={deleteCommunity}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
