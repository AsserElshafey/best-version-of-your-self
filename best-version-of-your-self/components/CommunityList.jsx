"use client";
import React from "react";
import CommunityCard from "@/components/CommunityCard";
import { useCommunities } from "@/hooks/useCommunities";
import { Loader, Button, Alert } from "@mantine/core";
import { AlertTriangle, RefreshCw } from "lucide-react";

const CommunityList = () => {
  const { communities, loading, error, fetchUserCommunities } =
    useCommunities();

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
          onClick={fetchUserCommunities}
          variant="filled"
          color="blue"
          leftSection={<RefreshCw size={16} />}
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
