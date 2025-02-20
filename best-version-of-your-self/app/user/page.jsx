"use client";

import React, { useState, useEffect, useCallback } from "react";
import Nav from "@/components/Nav";
import SideBar from "@/components/SideBar";
import Community from "@/components/Community";
import { axiosPrivate } from "../../api/axios";

const useCommunities = () => {
  const [communities, setCommunities] = useState([]);

  const fetchUserCommunities = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("Missing user ID or token in localStorage");
        return;
      }

      const response = await axiosPrivate.get(`/communities/users/${userId}`);
      setCommunities(response.data.communities || []);
    } catch (error) {
      console.error("Failed to fetch user communities:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserCommunities();
  }, [fetchUserCommunities]);

  const addCommunity = useCallback(
    (newCommunity) => setCommunities((prev) => [...prev, newCommunity]),
    []
  );

  const deleteCommunity = useCallback(async (communityId) => {
    try {
      await axiosPrivate.delete(`/communities/${communityId}`);
      setCommunities((prev) => prev.filter((c) => c.id !== communityId));
    } catch (error) {
      console.error("Failed to delete community:", error);
    }
  }, []);

  return { communities, addCommunity, deleteCommunity };
};

const User = () => {
  const { communities, addCommunity, deleteCommunity } = useCommunities();
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div>
      <Nav addCommunity={addCommunity} />
      <div className="flex transition-all duration-300">
        {/* Sidebar */}
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

        {/* Main Content */}
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

