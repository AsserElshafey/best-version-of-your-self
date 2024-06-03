"use client";
import { useState, useEffect } from "react";
import {
  MantineProvider,
  ScrollArea,
  ActionIcon,
  Tooltip,
  Modal,
  Menu,
  TextInput,
  Textarea,
  NumberInput,
  Button,
} from "@mantine/core";
import Image from "next/image";
import {
  EllipsisHorizontalIcon,
  PlusIcon,
  UserPlusIcon,
  UserMinusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { useDisclosure } from "@mantine/hooks";
import HabitCard from "./HabitCard";
import Background from "./Background";
import api from "@/utils/api";

const Community = ({ community, onBack, deleteCommunity }) => {
  const [opened, { open: openFirst, close: closeFirst }] = useDisclosure(false);
  const [openedAddMember, { open: openSecond, close: closeSecond }] =
    useDisclosure(false);
  const [openedDeleteCommunity, { open: openThird, close: closeThird }] =
    useDisclosure(false);

  const [openedMenu, setOpened] = useState(false);
  const [deleteButton, setDeleteButton] = useState(true);
  const [habits, setHabits] = useState([]);

  const handleClose = () => {
    setDeleteButton(true);
    closeThird();
  };

  const fetchCommunityHabits = async (communityId) => {
    try {
      console.log(communityId);
      const response = await api.get(
        `api/v1/communities/${communityId}/habits/`
      );
      const habits = response.data;
      console.log(habits);

      // const communityPromises = communityIds.map(async (communityId) => {
      //   const communityResponse = await api.get(`api/v1/communities/${communityId}/habits`);
      //   return communityResponse.data;
      // });
      // const communitiesData = await Promise.all(communityPromises);
      setHabits(habits);
    } catch (error) {
      console.error("Error fetching community habits", error);
      alert("error");
    }
  };

  useEffect(() => {
    fetchCommunityHabits(community.id);
  }, [community.id]);

  return (
    <MantineProvider>
      <ScrollArea>
        <div className="fullscreen">
          <Background>
            <div className="flex-between p-2 pr-4 bg-gradient-to-r from-gray-800 via-slate-900 to-gray-700 border-b border-gray-500 fixed w-full md:w-2/3 z-50">
              <div className="flex items-center gap-2">
                <div className="block md:hidden">
                  <ActionIcon
                    variant="subtle"
                    size="xl"
                    radius="xl"
                    onClick={onBack}
                  >
                    <ArrowLeftIcon className="h-7 w-7 text-white" />
                  </ActionIcon>
                </div>
                <Image
                  src="/images/gigachad.jpg"
                  alt="Prmptopia Logo"
                  width={55}
                  height={55}
                  className="object-contain rounded-full"
                />
                <p className="font-semibold text-white text-lg">
                  {community.name}
                </p>
              </div>
              <Menu
                shadow="md"
                width={210}
                opened={openedMenu}
                onChange={setOpened}
                withArrow
              >
                <Menu.Target>
                  <ActionIcon
                    variant="outline"
                    color="gray"
                    size="lg"
                    radius="xl"
                    aria-label="Settings"
                  >
                    <EllipsisHorizontalIcon className="h-8 w-8" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Manage community</Menu.Label>
                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<UserPlusIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: "green", to: "cyan", deg: 90 }}
                      onClick={openSecond}
                    >
                      Add members
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<UserMinusIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: "red", to: "cyan", deg: 190 }}
                    >
                      Remove members
                    </Button>
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<PencilSquareIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                      Edit Community
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<TrashIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{
                        from: "red",
                        to: "rgba(255, 130, 130, 1)",
                        deg: 190,
                      }}
                      onClick={openThird}
                    >
                      Delete Community
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>

            <div className="flex flex-col items-center justify-center mx-4 md:mx-0">
              <div className="mb-20" />
              {habits.length === 0  ? (
                <div className="flex-center fullscreen">
                  Select a community to view its details
                </div>
              ) : (
                habits.map((habit) => 
                <HabitCard key={habit.id} data={habit}/>)
              )}
              
            </div>
            <div className="fixed bottom-10 right-4">
              <Tooltip label="New Habit">
                <ActionIcon
                  variant="gradient"
                  gradient={{ from: "green", to: "cyan", deg: 90 }}
                  size="xl"
                  radius="xl"
                  aria-label="Settings"
                  onClick={openFirst}
                >
                  <PlusIcon className="h-6 w-6" />
                </ActionIcon>
              </Tooltip>
            </div>

            {/* Delete Community modal */}
            <Modal
              opened={openedDeleteCommunity}
              onClose={handleClose}
              title="Delete Community"
              centered
            >
              <div className="text-center mb-4">
                <p className="text-3xl mb-2">
                  Are you sure you want to delete{" "}
                  <span className="font-bold">{community.name}</span>?
                </p>

                <p>Once this action is done, it cannot be reversed.</p>
              </div>
              <TextInput
                className="mb-5"
                size="md"
                radius="md"
                label={`Please type '${community.name}' to enable the delete button.`}
                placeholder={`Please type ${community.name} here`}
                onChange={(e) => {
                  if (e.target.value === community.name) {
                    setDeleteButton(false);
                  } else {
                    setDeleteButton(true);
                  }
                }}
              />
              <div className="flex-center gap-5">
                <Button
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  leftSection={<TrashIcon className="w-5 h-5" />}
                  variant="gradient"
                  gradient={{
                    from: "red",
                    to: "rgba(255, 130, 130, 1)",
                    deg: 190,
                  }}
                  disabled={deleteButton}
                  onClick={() => deleteCommunity(community.id)}
                >
                  Delete
                </Button>
              </div>
            </Modal>

            {/* add mebers modal */}
            <Modal
              opened={openedAddMember}
              onClose={closeSecond}
              title="Add Members"
              centered
            >
              <TextInput
                className="mb-5"
                size="md"
                radius="md"
                label="Enter username or Email"
                placeholder="Ex ahmed123 or ahmed@gmail.com"
              />
              <Button
                leftSection={<PlusIcon className="w-5 h-5" />}
                variant="gradient"
                gradient={{ from: "green", to: "cyan", deg: 190 }}
              >
                Add
              </Button>
            </Modal>

            {/* New habit modal */}
            <Modal
              opened={opened}
              onClose={closeFirst}
              title="New Habit"
              centered
            >
              <TextInput
                className="mt-4"
                size="md"
                radius="md"
                label="Habit Title"
                withAsterisk
                placeholder="Input placeholder"
              />
              <Textarea
                className="mt-4"
                size="md"
                radius="md"
                label="Habit Details"
                withAsterisk
                placeholder="Input placeholder"
              />
              <Textarea
                className="mt-4"
                size="md"
                radius="md"
                label="Habit Motivation"
                withAsterisk
                placeholder="Input placeholder"
              />
              <div className="flex-between p-2 gap-10 mt-4">
                <NumberInput
                  size="md"
                  radius="md"
                  label="Days per week"
                  withAsterisk
                  placeholder="Input placeholder"
                  min={1}
                  max={7}
                />
                <NumberInput
                  size="md"
                  radius="md"
                  label="Duration"
                  withAsterisk
                  placeholder="In Mins"
                  min={1}
                />
              </div>
              <div className="flex justify-end mt-8 mb-2">
                <Button
                  leftSection={<PlusIcon className="w-5 h-5" />}
                  variant="gradient"
                  gradient={{ from: "green", to: "cyan", deg: 90 }}
                  size="md"
                  radius="xl"
                >
                  Create
                </Button>
              </div>
            </Modal>
          </Background>
        </div>
      </ScrollArea>
    </MantineProvider>
  );
};

export default Community;
