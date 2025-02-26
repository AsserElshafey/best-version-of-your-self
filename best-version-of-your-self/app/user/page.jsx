"use client";

import React, { useState } from "react";
import Nav from "@/components/Nav";
import SideBar from "@/components/SideBar";
import Community from "@/components/Community";
import { useCommunities } from "@/hooks/useCommunities";

const User = () => {
  const { communities, addCommunity, deleteCommunity } = useCommunities();
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <div>
      {/* <Nav addCommunity={addCommunity} /> */}
      <div className="flex transition-all duration-300">
        {/* Sidebar */}
        <div
          className={`fixed inset-0 md:mt-0 md:relative md:w-1/5 ${
            selectedCommunity
              ? "translate-x-[-100%] md:translate-x-0"
              : "translate-x-0"
          } transition-transform duration-300 ease-in-out`}
        >
          <SideBar
            onSelectCommunity={setSelectedCommunity}
            selectedCommunity={selectedCommunity}
            communities={communities}
            addCommunity={addCommunity}
          />
        </div>

        {/* Main Content */}
        <div
          className={`w-full md:w-4/5 ml-0 md:ml-auto ${
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
