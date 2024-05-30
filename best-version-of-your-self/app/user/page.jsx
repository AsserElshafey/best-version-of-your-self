"use client";
import Nav from '@/components/Nav';
import api from "/utils/api";
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import SideBar from '@/components/SideBar';
import Community from '@/components/Community';

const User = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communities, setCommunities] = useState([]);

  const addCommunity = (newCommunity) => {
    setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
  };

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
    <ProtectedRoute>
      <div>
        <Nav addCommunity={addCommunity} />
        <div className="flex transition-all duration-300">
          <div className={`fixed inset-0 mt-81px md:mt-0 md:relative md:w-1/3 ${selectedCommunity ? 'translate-x-[-100%] md:translate-x-0' : 'translate-x-0'} transition-transform duration-300 ease-in-out`}>
            <SideBar
              onSelectCommunity={setSelectedCommunity}
              selectedCommunity={selectedCommunity}
              communities={communities}
            />
          </div>
          <div className={`w-full md:w-2/3 ml-0 md:ml-auto ${!selectedCommunity ? 'hidden md:block' : 'block'} transition-transform duration-300 ease-in-out`}>
            {!selectedCommunity ? (
              <div className="flex-center fullscreen">
                Select a community to view its details
              </div>
            ) : (
              <Community
                community={selectedCommunity}
                onBack={() => setSelectedCommunity(null)}
              />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default User;
