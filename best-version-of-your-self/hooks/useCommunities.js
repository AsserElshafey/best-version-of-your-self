import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";



export const useCommunities = () => {
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