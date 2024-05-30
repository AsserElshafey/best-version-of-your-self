"use client";
import React, { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import axios from "axios";
import { apiUrl } from "@/utils/api";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    getAllCommunities();
  }, []);

  const getAllCommunities = async () => {
    try {
      const response = await axios.get(
        apiUrl + "api/v1/communities/"
      );
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
