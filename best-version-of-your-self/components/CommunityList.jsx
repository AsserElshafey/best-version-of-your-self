"use client";
import React, { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import { axiosPrivate } from "@/api/axios";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    getAllCommunities();
  }, []);

  const getAllCommunities = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosPrivate.get(`/communities/users/${userId}`);
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching all communities", error);
      alert(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
      {communities.map((community) => (
        <CommunityCard key={community.id} data={community} />
      ))}
    </div>
  );
};

export default CommunityList;
