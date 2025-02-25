"use client";
import { useState, useCallback } from "react";
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
import HabitCard from "./archive/HabitCard";
import Background from "./Background";
import { useRouter } from "next/navigation";
import { useCommunityHabits } from "@/hooks/useCommunityHabits";
import HabitsChecklist from "./habits/HabitsChecklist";

const Community = ({ community, onBack, deleteCommunity }) => {
  const router = useRouter();
  // const { habits, addHabit, deleteHabit } = useCommunityHabits(community.id);

  const [opened, { open: openFirst, close: closeFirst }] = useDisclosure(false);
  const [openedAddMember, { open: openSecond, close: closeSecond }] =
    useDisclosure(false);
  const [openedDeleteCommunity, { open: openThird, close: closeThird }] =
    useDisclosure(false);

  const [openedMenu, setOpened] = useState(false);
  const [deleteButton, setDeleteButton] = useState(true);

  const [name, setHabitName] = useState("");
  const [description, setHabitDesc] = useState("");
  const [frequency, setHabitFrequency] = useState("");
  const [duration, setHabitDuration] = useState("");
  const [motivation, setHabitMotivation] = useState(null);

  const handleClose = () => {
    setDeleteButton(true);
    closeThird();
  };
 

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

          {/* Fix: Move the onClick to Menu.Item */}
          <Menu.Item
            onClick={openSecond}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
            }}
          >
            <UserPlusIcon className="w-5 h-5" />
            Add members
          </Menu.Item>

          <Menu.Item
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
            }}
          >
            <UserMinusIcon className="w-5 h-5" />
            Remove members
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
            }}
          >
            <PencilSquareIcon className="w-5 h-5" />
            Edit Community
          </Menu.Item>

          <Menu.Item
            onClick={openThird}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
              color: "red",
            }}
          >
            <TrashIcon className="w-5 h-5" />
            Delete Community
          </Menu.Item>
        </Menu.Dropdown>
              </Menu>
            </div>

            <div className="flex flex-col items-center justify-center mx-4 md:mx-0">
              <div className="mb-20" />
              <HabitsChecklist communityId={community.id} />
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
                  onClick={() => {
                    deleteCommunity(community.id);
                    onBack();
                    handleClose();}}
                >
                  Delete
                </Button>
              </div>
            </Modal>

            {/* add members modal */}
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
          </Background>
        </div>
      </ScrollArea>
    </MantineProvider>
  );
};

export default Community;
