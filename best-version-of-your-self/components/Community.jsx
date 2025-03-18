"use client";
import { useState, useEffect } from "react";
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
  Notification,
  Table,
  Avatar,
} from "@mantine/core";
import Image from "next/image";
import {
  EllipsisHorizontalIcon,
  PlusIcon,
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useDisclosure } from "@mantine/hooks";
import Background from "./Background";
import HabitsChecklist from "./habits/HabitsChecklist";
import { axiosPrivate } from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const Community = ({ community, onBack, deleteCommunity }) => {
  const { auth } = useAuth();

  const [openedAddMember, { open: openAddMember, close: closeAddMember }] =
    useDisclosure(false);
  const [
    openedDeleteCommunity,
    { open: openDeleteCommunity, close: closeDeleteCommunity },
  ] = useDisclosure(false);
  const [openedMembers, { open: openMembers, close: closeMembers }] =
    useDisclosure(false);
  const [
    openedDeleteMember,
    { open: openDeleteMember, close: closeDeleteMember },
  ] = useDisclosure(false);
  const [openedMenu, setOpenedMenu] = useState(false);
  const [deleteButton, setDeleteButton] = useState(true);
  const [memberIdentifier, setMemberIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // Add state for owner check

  // Check if current user is the owner
  useEffect(() => {
    if (community && auth?.userId) {
      setIsOwner(community.creator === auth.userId);
    }
  }, [community, auth?.userId]);

  const handleClose = () => {
    setDeleteButton(true);
    closeDeleteCommunity();
  };

  const fetchMembers = async () => {
    setMembersLoading(true);
    try {
      const response = await axiosPrivate.get(
        `/communities/${community.id}/members`
      );
      setMembers(response.data.community.members);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to fetch members",
      });
    } finally {
      setMembersLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!memberIdentifier) {
      setNotification({
        type: "error",
        message: "Please enter a username or email",
      });
      return;
    }

    setLoading(true);
    try {
      await axiosPrivate.post(
        `/communities/${community.id}/members`,
        {
          identifier: memberIdentifier,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotification({
        type: "success",
        message: "Member added successfully",
      });
      setMemberIdentifier("");
      fetchMembers();
      setTimeout(() => {
        closeAddMember();
        setNotification(null);
      }, 2000);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Failed to add member",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteMember = (member) => {
    setMemberToDelete(member);
    openDeleteMember();
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    try {
      await axiosPrivate.delete(
        `/communities/${community.id}/members/${memberToDelete.id}`
      );
      setNotification({
        type: "success",
        message: "Member removed successfully",
      });
      fetchMembers();
      closeDeleteMember();
    } catch (error) {
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Failed to remove member",
      });
    }
  };

  useEffect(() => {
    if (openedMembers) {
      fetchMembers();
    }
  }, [openedMembers]);

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
              {/* Only show the menu if user is authenticated */}
              {auth?.userId && (
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
                      onClick={openMembers}
                      leftSection={<UsersIcon className="w-5 h-5" />}
                    >
                      View members
                    </Menu.Item>
                    <Menu.Divider />

                    {/* Only show edit/delete for owner */}
                    {isOwner && (
                      <>
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
                      </>
                    )}
                  </Menu.Dropdown>
                </Menu>
              )}
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

          {/* Rest of the Modals - no changes needed */}
          {/* Delete Community Modal */}
          <Modal
            opened={openedDeleteCommunity}
            onClose={handleClose}
            title="Delete Community"
            centered
            radius="md"
            overlayProps={{
              blur: 3,
              opacity: 0.55,
            }}
            trapFocus // Ensure focus is trapped within the modal
            closeOnClickOutside={false} // Prevent closing when clicking outside
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
            onClose={() => {
              closeAddMember();
              setMemberIdentifier("");
              setNotification(null);
            }}
            title="Add Members"
            centered
            radius="md"
            trapFocus // Ensure focus is trapped within the modal
            closeOnClickOutside={false} // Prevent closing when clicking outside
          >
            <TextInput
              mb="lg"
              size="md"
              radius="md"
              label="Enter username or Email"
              placeholder="Ex: ahmed123 or ahmed@gmail.com"
              value={memberIdentifier}
              onChange={(e) => setMemberIdentifier(e.target.value)}
              disabled={loading}
            />
            {notification && (
              <Notification
                key={notification.message}
                color={notification.type === "error" ? "red" : "green"}
                title={notification.type === "error" ? "Error" : "Success"}
                onClose={() => setNotification(null)}
                mb="lg"
              >
                {notification.message}
              </Notification>
            )}
            <Group position="right">
              <Button
                leftSection={<PlusIcon className="w-5 h-5" />}
                variant="filled"
                color="primary"
                className="hover:bg-primary-dark transition-colors" // Just added hover effect
                onClick={handleAddMember}
                loading={loading}
                disabled={!memberIdentifier || loading}
              >
                Add Member
              </Button>
            </Group>
          </Modal>
          {/* View Members Modal */}
          <Modal
            opened={openedMembers}
            onClose={closeMembers}
            title="Community Members"
            centered
            radius="md"
            size="lg"
            trapFocus
            closeOnClickOutside={false}
          >
            <ScrollArea h={300}>
              {membersLoading ? (
                <Text align="center" py="md">
                  Loading members...
                </Text>
              ) : members.length === 0 ? (
                <Text align="center" py="md">
                  No members found
                </Text>
              ) : (
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Member</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {members.map((member) => (
                      <Table.Tr key={member.id}>
                        <Table.Td>
                          <Group spacing="sm">
                            <Avatar
                              size="sm"
                              radius="xl"
                              src={member.user.profile.image}
                              alt={member.user.name || member.user.username}
                            />
                            <Text>
                              {member.user.name ||
                                member.user.username ||
                                "Unknown"}
                            </Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => confirmDeleteMember(member.user)}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}
            </ScrollArea>
          </Modal>
          {/* Delete Member Confirmation Modal */}
          <Modal
            opened={openedDeleteMember}
            onClose={closeDeleteMember}
            title="Remove Member"
            centered
            radius="md"
            trapFocus
            closeOnClickOutside={false}
            overlayProps={{
              blur: 3,
              opacity: 0.55,
            }}
          >
            <Text size="lg" mb={20}>
              Are you sure you want to remove{" "}
              <Text span fw={700} inherit>
                {memberToDelete?.name ||
                  memberToDelete?.username ||
                  "this member"}
              </Text>{" "}
              from the community?
            </Text>
            <Group position="apart">
              <Button
                variant="outline"
                color="blue"
                onClick={closeDeleteMember}
              >
                Cancel
              </Button>
              <Button
                leftSection={<TrashIcon className="w-5 h-5" />}
                variant="filled"
                color="red"
                onClick={handleDeleteMember}
              >
                Remove
              </Button>
            </Group>
          </Modal>
        </div>
      </Background>
    </MantineProvider>
  );
};

export default Community;
