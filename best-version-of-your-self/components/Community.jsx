"use client";
import { useState } from "react";
import {
  MantineProvider,
  ScrollArea,
  ActionIcon,
  Modal,
  Menu,
  TextInput,
  Button,
  Title,
  Text,
  Group,
  Box,
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
import Background from "./Background";
import { useRouter } from "next/navigation";
import HabitsChecklist from "./habits/HabitsChecklist";

const Community = ({ community, onBack, deleteCommunity }) => {
  const [openedAddMember, { open: openAddMember, close: closeAddMember }] =
    useDisclosure(false);
  const [
    openedDeleteCommunity,
    { open: openDeleteCommunity, close: closeDeleteCommunity },
  ] = useDisclosure(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [deleteButton, setDeleteButton] = useState(true);

  const handleClose = () => {
    setDeleteButton(true);
    closeDeleteCommunity();
  };

  return (
    <MantineProvider>
      <Background>
        <div className="min-h-screen flex flex-col border-l border-gray-200 shadow-md">
          {/* Header */}
          <header className="bg-grey-200 shadow-sm fixed w-full md:w-4/5 z-50">
            <div className="flex items-center justify-between px-4 py-2">
              <Group spacing="sm">
                <ActionIcon
                  variant="subtle"
                  color="primary-dark"
                  size="lg"
                  className="block md:hidden"
                  onClick={onBack}
                >
                  <ArrowLeftIcon className="h-6 w-6 md:hidden" />
                </ActionIcon>

                <Group spacing="xs">
                  <Image
                    src="/images/gigachad.jpg"
                    alt={community.name}
                    width={45}
                    height={45}
                    className="object-cover rounded-full border-2 border-white"
                  />
                  <Title order={4} className="text-black">
                    {community.name}
                  </Title>
                </Group>
              </Group>

              <Menu
                shadow="lg"
                width={220}
                opened={openedMenu}
                onChange={setOpenedMenu}
                withArrow
                position="bottom-end"
              >
                <Menu.Target>
                  <ActionIcon
                    variant="light"
                    color="gray"
                    size="lg"
                    radius="xl"
                    className="hover:bg-primary-dark hover:text-white transition-colors"
                  >
                    <EllipsisHorizontalIcon className="h-6 w-6" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label fw={600}>Manage Community</Menu.Label>

                  <Menu.Item
                    onClick={openAddMember}
                    leftSection={<UserPlusIcon className="w-5 h-5" />}
                  >
                    Add members
                  </Menu.Item>

                  <Menu.Item
                    leftSection={<UserMinusIcon className="w-5 h-5" />}
                  >
                    Remove members
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    leftSection={<PencilSquareIcon className="w-5 h-5" />}
                  >
                    Edit Community
                  </Menu.Item>

                  <Menu.Item
                    onClick={openDeleteCommunity}
                    color="red"
                    leftSection={<TrashIcon className="w-5 h-5" />}
                  >
                    Delete Community
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 mt-16 px-4 pb-8">
            <ScrollArea className="h-full">
              <Box pt={4}>
                <HabitsChecklist communityId={community.id} />
              </Box>
            </ScrollArea>
          </main>

          {/* Modals */}
          {/* Delete Community Modal */}
          <Modal
            opened={openedDeleteCommunity}
            onClose={handleClose}
            title={<Title order={3}>Delete Community</Title>}
            centered
            radius="md"
            overlayProps={{
              blur: 3,
              opacity: 0.55,
            }}
          >
            <div className="text-center mb-6">
              <Text size="lg" mb={10}>
                Are you sure you want to delete{" "}
                <Text span fw={700} inherit>
                  {community.name}
                </Text>
                ?
              </Text>

              <Text size="sm" color="gray.6">
                Once this action is done, it cannot be reversed.
              </Text>
            </div>

            <TextInput
              mb="lg"
              size="md"
              radius="md"
              label={`Please type '${community.name}' to enable the delete button`}
              placeholder={community.name}
              onChange={(e) => {
                setDeleteButton(e.target.value !== community.name);
              }}
            />

            <Group position="apart">
              <Button variant="outline" color="blue" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                leftSection={<TrashIcon className="w-5 h-5" />}
                variant="filled"
                color="red"
                disabled={deleteButton}
                onClick={() => {
                  deleteCommunity(community.id);
                  onBack();
                  handleClose();
                }}
              >
                Delete
              </Button>
            </Group>
          </Modal>

          {/* Add Members Modal */}
          <Modal
            opened={openedAddMember}
            onClose={closeAddMember}
            title={<Title order={3}>Add Members</Title>}
            centered
            radius="md"
          >
            <TextInput
              mb="lg"
              size="md"
              radius="md"
              label="Enter username or Email"
              placeholder="Ex: ahmed123 or ahmed@gmail.com"
            />

            <Group position="right">
              <Button
                leftSection={<PlusIcon className="w-5 h-5" />}
                variant="filled"
                color="primary"
              >
                Add Member
              </Button>
            </Group>
          </Modal>
        </div>
      </Background>
    </MantineProvider>
  );
};

export default Community;
