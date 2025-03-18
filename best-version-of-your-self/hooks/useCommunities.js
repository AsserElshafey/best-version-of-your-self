import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

export const useCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const fetchUserCommunities = useCallback(async () => {
    // Return early if no userId is available
    if (!auth?.userId) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosPrivate.get(`/communities/users/${auth.userId}`);
      
      if (response.data && Array.isArray(response.data.communities)) {
        setCommunities(response.data.communities);
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where API returns array directly
        setCommunities(response.data);
      } else {
        setError("Unexpected response format from server");
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      setError("Failed to fetch communities");
      console.error("Failed to fetch user communities:", error);
    } finally {
      setLoading(false);
    }
  }, [auth?.userId]);

  // Fetch communities when userId changes or on initial load
  useEffect(() => {
    if (auth?.userId) {
      fetchUserCommunities();
    }
  }, [auth?.userId, fetchUserCommunities]);

  const addCommunity = useCallback((newCommunity) => {
    setCommunities((prev) => [...prev, newCommunity]);
  }, []);

  const deleteCommunity = useCallback(async (communityId) => {
    try {
      setLoading(true);
      await axiosPrivate.delete(`/communities/${communityId}`);
      setCommunities((prev) => prev.filter((c) => c.id !== communityId));
    } catch (error) {
      setError("Failed to delete community");
      console.error("Failed to delete community:", error);
      throw error; // Re-throw so the UI can handle it
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    communities, 
    addCommunity, 
    deleteCommunity, 
    fetchUserCommunities,
    loading,
    error 
  };
};
