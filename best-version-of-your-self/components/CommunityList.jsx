"use client";
import React, { useEffect, useState } from "react";
import CommunityCard from "@/components/CommunityCard";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import { Loader, Button, Alert } from "@mantine/core";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth, isAuthenticated } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();

  // Use the updated useAxiosPrivate hook instead of the direct import
  useEffect(() => {
    // Only fetch communities if user is authenticated and has a userId
    if (auth?.userId && isAuthenticated()) {
      getAllCommunities();
    } else if (!isAuthenticated()) {
      // If not authenticated, redirect to login
      setError("Authentication required. Please log in.");

      // Add a slight delay before redirect to show the error message
      const redirectTimer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(redirectTimer);
    } else {
      setLoading(false);
    }
  }, [auth?.userId, isAuthenticated]);

  const getAllCommunities = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosPrivate.get(
        `/communities/users/${auth.userId}`
      );

      // Ensure we're handling different response formats
      if (Array.isArray(response.data)) {
        setCommunities(response.data);
      } else if (response.data && Array.isArray(response.data.communities)) {
        setCommunities(response.data.communities);
      } else {
        setCommunities([]);
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);

      // Handle token errors specifically
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setError("Your session has expired. Please log in again.");

        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError("Failed to load communities. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 max-w-md mx-auto">
        <Alert
          icon={<AlertTriangle size={16} />}
          title="Error Loading Communities"
          color="red"
          variant="filled"
          className="mb-4"
        >
          {error}
        </Alert>

        <Button
          onClick={getAllCommunities}
          variant="filled"
          color="blue"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="text-center py-8 max-w-md mx-auto">
        <Alert
          icon={<AlertTriangle size={16} />}
          title="No Communities"
          color="blue"
          variant="light"
        >
          You don&apos;t have any communities yet. Create one to get started!
        </Alert>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6">
      {communities.map((community) => (
        <CommunityCard key={community.id} data={community} />
      ))}
    </div>
  );
};

export default CommunityList;
