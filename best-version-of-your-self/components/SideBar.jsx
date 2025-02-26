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
        <div className="flex items-center p-3 cursor-pointer hover:bg-gray-300 transition-colors">
          <Avatar src="/images/gigachad.jpg" alt={name} radius="xl" size="md" />
          <div className="ml-3">
            <p className="font-medium text-gray-800">{username}</p>
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
  function signOut() {
    localStorage.clear();
    router.push("/");
  }

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const [openedModal, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState(undefined);
  const resetRef = useRef(null);
  const [communityName, setCommunityName] = useState(null);
  const [communityDesc, setCommunityDesc] = useState(null);
  const [communityTag, setCommunityTag] = useState(null);

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
        <div className="flex items-center justify-between bg-primary p-4 border-b">
          <div className="flex items-center">
            <p className="font-bold text-light text-xl">Better</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-100 p-3 border-b">
          <div
            className="flex items-center p-2 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectCommunity(null)}
          >
            <HomeIcon className="h-6 w-6 mr-2 text-primary" />
            <span className="font-medium">Home</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-center gap-5 p-3 bg-gray-100 border-b shadow-md">
          <Input
            className="w-4/5 shadow-md"
            size="md"
            rightSection={<MagnifyingGlassIcon className="h-6 w-6" />}
            placeholder="Search Communities"
          />
          <AdjustmentsHorizontalIcon className="h-7 w-7" />
        </div>

        {/* Communities Section */}
        <div className="px-3 py-2 bg-white border-b">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-700 font-">
              MY COMMUNITIES
            </span>
            <Button
              variant="light"
              color="green"
              size={"compact-md"}
              className="shadow-sm"
              rightIcon={<PlusCircleIcon className="h-5 w-5" />}
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
      >
        <div>
          <div className="flex items-end gap-3">
            <Image
              src={file ? URL.createObjectURL(file) : "/images/gigachad.jpg"}
              width={85}
              height={85}
              className="rounded-full mr-2"
              alt="profile-img"
            />
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <Button disabled={!file} color="red" onClick={clearFile}>
              Reset
            </Button>
          </div>
          {file && (
            <Text size="sm" ta="start" mt="sm">
              Picked file: {file.name}
            </Text>
          )}
          <div className="mt-10">
            <TextInput
              className="mb-5"
              label="Community Name"
              placeholder="Enter community name here"
              withAsterisk
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
            />
            <TextInput
              className="mb-5"
              label="Community Tag"
              placeholder="Enter community tag here"
              withAsterisk
              value={communityTag}
              onChange={(e) => setCommunityTag(e.target.value)}
            />
            <Textarea
              className="mb-20"
              label="Community description"
              placeholder="Enter the community description"
              value={communityDesc}
              onChange={(e) => setCommunityDesc(e.target.value)}
            />
            <div className="flex justify-end my-4">
              <Button
                leftSection={<PlusIcon className="w-5 h-5" />}
                variant="gradient"
                gradient={{ from: "green", to: "cyan", deg: 90 }}
                size="md"
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
