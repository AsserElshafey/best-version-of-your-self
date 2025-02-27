import {
  MantineProvider,
  ScrollArea,
  Text,
  Input,
  Avatar,
  Menu,
  Button,
  TextInput,
  Textarea,
  Modal,
  FileButton,
} from "@mantine/core";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import "@mantine/core/styles.css";
import { PlusIcon } from "lucide-react";
import { axiosPrivate } from "@/api/axios";
import SideBarCards from "./SideBarCards";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosPrivate.get("/users/me");
      setUsername(response.data.user.username);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("error");
    }
  };

  return (
    <Menu position="top" width={200}>
      <Menu.Target>
        <div className="flex items-center p-2 cursor-pointer hover:bg-gray-300 transition-colors">
          <Avatar src="/images/gigachad.jpg" alt={name} radius="xl" size="sm" />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800">{username}</p>
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </div>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<UserCircleIcon className="h-4 w-4" />}>
          Profile
        </Menu.Item>
        <Menu.Item icon={<ArrowRightOnRectangleIcon className="h-4 w-4" />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const SideBar = ({
  onSelectCommunity,
  selectedCommunity,
  communities,
  addCommunity,
}) => {
  const [openedModal, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState(undefined);
  const resetRef = useRef(null);
  const [communityName, setCommunityName] = useState(null);
  const [communityDesc, setCommunityDesc] = useState(null);
  const [communityTag, setCommunityTag] = useState(null);

  // Define the clearFile function
  const clearFile = () => {
    setFile(null); // Clear the file state
    resetRef.current?.(); // Reset the file input
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const response = await axiosPrivate.post("/communities", {
          name: communityName,
          description: communityDesc,
          isPrivate: false,
          tag: communityTag,
        });
        addCommunity(response.data.community);
        setCommunityName("");
        setCommunityDesc("");
        setCommunityTag("");
        close();
      } catch (error) {
        alert(error);
      }
    },
    [communityName, communityDesc, communityTag, addCommunity]
  );

  const handleCreateCommunity = () => {
    open();
  };

  return (
    <MantineProvider>
      <div className="flex flex-col h-screen">
        {/* Logo Section */}
        <div className="flex items-center justify-between bg-primary p-3 border-b">
          <div className="flex items-center">
            <p className="font-bold text-light text-lg">Better</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-100 p-2 border-b">
          <div
            className="flex items-center p-1 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectCommunity(null)}
          >
            <HomeIcon className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium">Home</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-center gap-3 p-2 bg-gray-100 border-b shadow-md">
          <Input
            className="w-4/5 shadow-md"
            size="sm"
            rightSection={<MagnifyingGlassIcon className="h-5 w-5" />}
            placeholder="Search Communities"
          />
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
        </div>

        {/* Communities Section */}
        <div className="px-2 py-1 bg-white border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-700">
              My Communities
            </span>
            <Button
              variant="light"
              color="green"
              size="xs"
              className="shadow-sm"
              rightSection={<PlusCircleIcon className="h-4 w-4" />}
              onClick={handleCreateCommunity}
            >
              New
            </Button>
          </div>
        </div>

        {/* Communities List */}
        <ScrollArea className="flex-grow bg-gray-200">
          {communities.map((community) => (
            <SideBarCards
              key={community.id}
              icon="/images/gigachad.jpg"
              title={community.name}
              desc={
                community.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit."
              }
              onClick={() => onSelectCommunity(community)}
              isSelected={selectedCommunity?.id === community.id}
            />
          ))}
        </ScrollArea>

        {/* User Profile Section */}
        <div className="mt-auto border-t bg-gray-100">
          <UserProfile />
        </div>
      </div>

      <Modal
        opened={openedModal}
        onClose={close}
        title="Create New Community"
        centered
        size="sm"
      >
        <div>
          <div className="flex items-end gap-2">
            <Image
              src={file ? URL.createObjectURL(file) : "/images/gigachad.jpg"}
              width={70}
              height={70}
              className="rounded-full mr-2"
              alt="profile-img"
            />
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button size="xs" {...props}>
                  Upload image
                </Button>
              )}
            </FileButton>
            <Button size="xs" disabled={!file} color="red" onClick={clearFile}>
              Reset
            </Button>
          </div>
          {file && (
            <Text size="sm" ta="start" mt="sm">
              Picked file: {file.name}
            </Text>
          )}
          <div className="mt-5">
            <TextInput
              className="mb-3"
              label="Community Name"
              placeholder="Enter community name here"
              withAsterisk
              size="sm"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
            <TextInput
              className="mb-3"
              label="Community Tag"
              placeholder="Enter community tag here"
              withAsterisk
              size="sm"
              value={communityTag}
              onChange={(e) => setCommunityTag(e.target.value)}
            />
            <Textarea
              className="mb-10"
              label="Community description"
              placeholder="Enter the community description"
              size="sm"
              value={communityDesc}
              onChange={(e) => setCommunityDesc(e.target.value)}
            />
            <div className="flex justify-end my-2">
              <Button
                leftSection={<PlusIcon className="w-4 h-4" />}
                variant="gradient"
                gradient={{ from: "green", to: "cyan", deg: 90 }}
                size="sm"
                radius="xl"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </MantineProvider>
  );
};

export default SideBar;
