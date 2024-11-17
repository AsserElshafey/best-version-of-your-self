"use client";
import { useState, useEffect, useCallback } from "react";
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
import { useRouter } from "next/navigation";

const Community = ({ community, onBack, deleteCommunity }) => {
  const router = useRouter();
  const [opened, { open: openFirst, close: closeFirst }] = useDisclosure(false);
  const [openedAddMember, { open: openSecond, close: closeSecond }] =
    useDisclosure(false);
  const [openedDeleteCommunity, { open: openThird, close: closeThird }] =
    useDisclosure(false);

  const [openedMenu, setOpened] = useState(false);
  const [deleteButton, setDeleteButton] = useState(true);
  const [habits, setHabits] = useState([]);

  const [name, setHabitName] = useState(null);
  const [description, setHabitDesc] = useState(null);
  const [frequency, setHabitFrequency] = useState("");
  const [duration, setHabitDuration] = useState("");
  const [motivation, setHabitMotivation] = useState(null);

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
      setHabits(habits);
    } catch (error) {
      console.error("Error fetching community habits", error);
      alert("error");
    }
  };

  const addHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const deleteHabit = async (habitId) => {
    try {
      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit.id !== habitId)
      );

      const response = await api.delete(
        `api/v1/communities/${community.id}/habits/${habitId}`
      );

      if (!response.status === 204) {
        setHabits((prevHabits) => [
          ...prevHabits,
          habits.find((habit) => habit.id === habitId),
        ]);
        throw new Error("Failed to delete habit.");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Error deleting habit: " + error);
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const res = await api.post(
          `api/v1/communities/${community.id}/habits/`,
          {
            name: name,
            description: description,
            motivation: motivation,
            frequency: frequency,
            duration: duration,
          }
        );
        const newHabit = res.data;
        addHabit(newHabit);
        setHabitName("");
        setHabitDesc("");
        setHabitFrequency(1);
        // setHabitDuration(0);
        setHabitMotivation("");
        closeFirst();
      } catch (error) {
        alert(error);
      }
    },
    [name, description, frequency, duration, router, addHabit]
  );

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
              {habits.length === 0 ? (
                <div className="flex-center fullscreen">
                  No Habits added yet
                </div>
              ) : (
                habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    data={habit}
                    deleteHabit={deleteHabit}
                  />
                ))
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
                value={name}
                onChange={(e) => setHabitName(e.target.value)}
              />
              <Textarea
                className="mt-4"
                size="md"
                radius="md"
                label="Habit Details"
                withAsterisk
                placeholder="Input placeholder"
                value={description}
                onChange={(e) => setHabitDesc(e.target.value)}
                z
              />
              <Textarea
                className="mt-4"
                size="md"
                radius="md"
                label="Habit Motivation"
                withAsterisk
                placeholder="Input placeholder"
                value={motivation}
                onChange={(e) => setHabitMotivation(e.target.value)}
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
                  value={frequency}
                  onChange={(value) => setHabitFrequency(value)}
                />
                <NumberInput
                  size="md"
                  radius="md"
                  label="Duration"
                  withAsterisk
                  placeholder="In Mins"
                  min={1}
                  value={duration}
                  onChange={(value) => setHabitDuration(value)}
                />
              </div>
              <div className="flex justify-end mt-8 mb-2">
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
            </Modal>
          </Background>
        </div>
      </ScrollArea>
    </MantineProvider>
  );
};

export default Community;
