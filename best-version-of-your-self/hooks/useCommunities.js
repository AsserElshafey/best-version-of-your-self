import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export const useCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const router = useRouter();

  const fetchUserCommunities = useCallback(async () => {
    // Return early if no userId is available
    if (!auth?.userId) {
      setError("User information is missing");
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
      console.error("Failed to fetch user communities:", error);
      
      // Handle authentication errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setError("Your session has expired. Please log in again.");
        
        notifications.show({
          title: "Session Expired",
          message: "Your session has expired. Redirecting to login...",
          color: "red",
        });

        router.push("/login");
      } else {
        setError("Failed to fetch communities");
      }
    } finally {
      setLoading(false);
    }
  }, [auth?.userId, router]);

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
      // Only set error state for non-auth errors since auth errors are handled globally
      if (!error?.response || (error.response.status !== 401 && error.response.status !== 403)) {
        setError("Failed to delete community");
      }
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
