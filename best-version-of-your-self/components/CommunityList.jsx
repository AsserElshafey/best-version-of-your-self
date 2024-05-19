"use client";
import React, { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import open_api from "../utils/api";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    getAllCommunities();
  }, []);

  const getAllCommunities = async () => {
    try {
      const response = await open_api.get("api/v1/communities/");
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching all communities", error);
      alert(error);
    }
  };

  return (
    <div>
      {communities.map((community) => (
        <CommunityCard key={community.id} data={community} />
      ))}
    </div>
  );
};

export default CommunityList;
