"use client";
import Link from "next/link";
import Image from "next/image";
import api from "../utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MantineProvider, Menu, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import {
  ArrowLeftEndOnRectangleIcon,
  IdentificationIcon,
  QueueListIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

/* Todo:
- handle isloggedin
- populate with more data
- change host with .env host
*/

const Nav = () => {
  const router = useRouter();
  const [openedModal, { open, close }] = useDisclosure(false);

  const [opened, setOpened] = useState(false);
  const [username, setUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("api/v1/user/");
      setUser(response.data.username);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
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
      <nav className="flex-between w-full py-3 px-3 bg-gray-800 border-b-2 border-green-600 shadow-md">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/images/gigachad.jpg"
            alt="Prmptopia Logo"
            width={55}
            height={55}
            className="object-contain rounded-full"
          />
          <p className="logo_text">BVOYS</p>
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
            <Link href="/myprofile">
              <Menu.Item
                leftSection={<IdentificationIcon className="w-4 h-4" />}
              >
                My Profile
              </Menu.Item>
            </Link>
            <Link href="/myhabits">
              <Menu.Item leftSection={<QueueListIcon className="w-4 h-4" />}>
                My Habits
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
          {/* Modal content */}
        </Modal>
      </nav>
    </MantineProvider>
  );
};

export default Nav;
