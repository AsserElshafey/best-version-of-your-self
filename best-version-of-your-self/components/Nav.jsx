"use client";
import Link from "next/link";
import Image from "next/image";
import api from "../utils/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MantineProvider, Menu, Modal,
  FileButton, Button, Text,
  TextInput, Textarea
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import {
  ArrowLeftEndOnRectangleIcon,
  IdentificationIcon,
  QueueListIcon,
  HomeIcon, PlusIcon,
  GlobeAltIcon
} from "@heroicons/react/24/solid";

/* Todo:
- populate with more data
*/

const Nav = ({ addCommunity }) => {
  const router = useRouter();
  const [openedModal, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState(undefined);
  const resetRef = useRef(null);

  const [username, setUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [communityName, setCommunityName] = useState(null);
  const [communityDesc, setCommunityDesc] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("api/v1/communities/", { "name": communityName, "description": communityDesc });
      const newCommunity = res.data;
      addCommunity(newCommunity);
      setCommunityName("");
      setCommunityDesc("");
      close()
    } catch (error) {
      alert(error);
    }
  }, [communityName, communityDesc, router, addCommunity]);


  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("api/v1/user/");
      setUser(response.data.username);
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("error")
    }
  };

  function signOut() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <MantineProvider>
      <nav className="flex-between w-full py-3 px-5 bg-gray-800 border-b-2 border-green-600 shadow-md">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/images/Logo.ico"
            alt="Prmptopia Logo"
            width={55}
            height={55}
            className="object-contain rounded-full"
          />
          <p className="logo_text">Better</p>
        </Link>

        {/* desktop nav */}

        <Menu
          shadow="md"
          width={200}
          opened={opened}
          onChange={setOpened}
          withArrow
        >
          <Menu.Target>
            <div className="flex justify-center cursor-pointer">
              <Image
                src="/images/gigachad.jpg"
                width={45}
                height={40}
                className="rounded-full mr-2"
                alt="profile-img"
              />
              <span className="sm:block hidden">
                <p className="font-semibold text-white">
                  {firstName}, {lastName}
                </p>
                <p className="text-white text-xs">{username}</p>
              </span>
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Link href="/user">
              <Menu.Item
                leftSection={<HomeIcon className="w-4 h-4" />}
              >
                Home Page
              </Menu.Item>
            </Link>
            <Link href="/discovercommunities">
              <Menu.Item
                leftSection={<GlobeAltIcon className="w-4 h-4" />}
              >
                Discover Communities
              </Menu.Item>
            </Link>

            <Link href="/myhabits">
              <Menu.Item leftSection={<QueueListIcon className="w-4 h-4" />}>
                My Habits
              </Menu.Item>
            </Link>
            <Link href="/myprofile">
              <Menu.Item
                leftSection={<IdentificationIcon className="w-4 h-4" />}
              >
                My Profile
              </Menu.Item>
            </Link>
            <Menu.Item className="hover:bg-white">
              <Button
                leftSection={<PlusIcon className="w-5 h-5" />}
                variant="gradient"
                gradient={{ from: 'green', to: 'cyan', deg: 90 }}
                onClick={open}
              >
                New Community
              </Button>
            </Menu.Item>

            <Menu.Divider />

            <div onClick={signOut}>
              <Menu.Item
                color="red"
                leftSection={
                  <ArrowLeftEndOnRectangleIcon className="w-4 h-4" />
                }
              >
                Sign out
              </Menu.Item>
            </div>
          </Menu.Dropdown>
        </Menu>

        <Modal
          opened={openedModal}
          onClose={close}
          title="Create New Community"
          centered
        >
          <div>
            <div className="flex items-end gap-3">
              <Image
                src={file ? URL.createObjectURL(file) : '/images/gigachad.jpg'}
                width={85}
                height={85}
                className="rounded-full mr-2"
                alt="profile-img"
              />
              <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
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
                  gradient={{ from: 'green', to: 'cyan', deg: 90 }}
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
      </nav>
    </MantineProvider>
  );
};

export default Nav;
